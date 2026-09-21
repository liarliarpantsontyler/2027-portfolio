"""Check delivered media dimensions, timing, duplicate frames, and loop seams."""
import json, pathlib, statistics, subprocess
root = pathlib.Path('public/work/klocky')
clocks = {'meridian', 'fold', 'sunday', 'lucent', 'index', 'quarters'}
report = []
for path in sorted(root.glob('*.mp4')):
    info = json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries','stream=width,height,r_frame_rate,nb_frames,codec_type:format=duration','-of','json',str(path)]))
    stream = info['streams'][0]
    assert len(info['streams']) == 1 and stream['codec_type'] == 'video', path
    assert stream['r_frame_rate'] == '60/1', path
    assert {stream['width'],stream['height']} == {2532,1170}, path
    duration = float(info['format']['duration'])
    assert duration == (30 if path.stem == 'onboarding' else 32 if path.stem == 'customization' else 14), path
    data = path.read_bytes()
    assert data.index(b'moov') < data.index(b'mdat'), path
    hashes = subprocess.check_output(['ffmpeg','-v','error','-i',str(path),'-f','framemd5','-']).decode()
    hashes = [line.rsplit(',',1)[1].strip() for line in hashes.splitlines() if not line.startswith('#')]
    repeats = sum(a == b for a,b in zip(hashes,hashes[1:]))
    if path.stem in clocks:
        assert repeats == 0, (path, repeats)
    entry = {'file':path.name,'width':stream['width'],'height':stream['height'],'fps':60,'frames':len(hashes),'duration':duration,'consecutiveDuplicateFrames':repeats,'megabytes':round(path.stat().st_size/1e6,2)}
    if path.stem in clocks:
        raw = subprocess.check_output(['ffmpeg','-v','error','-i',str(path),'-vf','scale=160:74','-pix_fmt','gray','-f','rawvideo','-'])
        size = 160*74
        frames = [raw[n:n+size] for n in range(0,len(raw),size)]
        diff = lambda a,b: sum(abs(x-y) for x,y in zip(a,b))/size
        adjacent = [diff(a,b) for a,b in zip(frames,frames[1:])]
        seam = diff(frames[-1],frames[0])
        entry.update(seamDifference=round(seam,3),typicalFrameDifference=round(statistics.median(adjacent),3),maximumFrameDifference=round(max(adjacent),3))
    report.append(entry)
    print(json.dumps(entry),flush=True)
pathlib.Path('/private/tmp/klocky-qa').mkdir(exist_ok=True)
pathlib.Path('/private/tmp/klocky-qa/media-report.json').write_text(json.dumps(report,indent=2)+'\n')
