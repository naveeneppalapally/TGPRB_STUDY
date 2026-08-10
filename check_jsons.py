import os, json, glob
for file in sorted(glob.glob('/home/naveen/Documents/TGPRB/Extracted_JSON/*.json')):
    try:
        data = json.load(open(file))
        q_nos = []
        for q in data:
            if 'q_no' in q and isinstance(q['q_no'], int):
                q_nos.append(q['q_no'])
        
        max_q = max(q_nos) if q_nos else 0
        print(f"{os.path.basename(file)}: {len(data)} questions, max q_no: {max_q}")
    except Exception as e:
        print(f"{os.path.basename(file)}: ERROR {e}")
