import { spawn } from 'node:child_process';
import { once } from 'node:events';
import fs from 'node:fs/promises';
import path from 'node:path';
const source=process.env.CAPTURE_OUT||'/private/tmp/klocky-renders';
const output=path.resolve('public/work/klocky');
const clocks=['meridian','fold','sunday','lucent','index','quarters'];
const demos=['hero','onboarding','customization','fullscreen'];
async function ffmpeg(args) {
  const child=spawn('ffmpeg',['-hide_banner','-loglevel','error','-y',...args],{stdio:'inherit'});
  const [code]=await once(child,'close');if(code!==0)throw new Error(`ffmpeg exited ${code}`);
}
for(const name of process.argv.slice(2).length?process.argv.slice(2):[...clocks,...demos]) {
  const input=path.join(source,`${name}-raw.mp4`);
  await fs.access(input);
  const staging=path.join(source,`${name}-delivery.mp4`);
  const encoding=['-an','-c:v','libx264','-preset','slow','-crf','18','-pix_fmt','yuv420p','-movflags','+faststart',staging];
  if(clocks.includes(name)) {
    // raw 1..15s -> dissolve raw 14..15s into raw 0..1s. End meets raw 1s exactly.
    await ffmpeg(['-i',input,'-filter_complex','[0:v]split=2[a][b];[a]trim=start=1:end=15,setpts=PTS-STARTPTS[body];[b]trim=start=0:end=1,setpts=PTS-STARTPTS[head];[body][head]xfade=transition=fade:duration=1:offset=13,format=yuv420p[v]','-map','[v]',...encoding]);
  } else {
    const duration=name==='onboarding'?30:name==='customization'?32:14;
    const color=name==='hero'||name==='onboarding'?'0xf6f5f1':'0x101012';
    await ffmpeg(['-i',input,'-vf',`fade=t=in:st=0:d=0.25:color=${color},fade=t=out:st=${duration-.3}:d=0.3:color=${color}`,...encoding]);
  }
  // Posters come from the same native-resolution capture, before the replay fade.
  const poster=clocks.includes(name)?`${name}.webp`:`${name}-poster.webp`;
  const posterTime=name==='customization'?8:name==='fullscreen'?7:1;
  await ffmpeg(['-ss',String(posterTime),'-i',input,'-frames:v','1','-c:v','libwebp','-quality','92',path.join(output,poster)]);
  await fs.copyFile(staging,path.join(output,`${name}.mp4`));
  console.log(`Encoded ${name}`);
}
