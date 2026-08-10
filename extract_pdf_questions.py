import json
import re

def extract_questions_from_text(text):
    questions = []
    
    # Split text into lines
    lines = text.split('\n')
    
    current_q_no = None
    current_question = []
    current_options = []
    
    # Regex to match question number (e.g. "1. ", "42. ")
    q_start_re = re.compile(r'^(\d+)\.\s+(.*)')
    
    # Regex to match options (e.g. "(1) Option 1 (2) Option 2 (3) Option 3 (4) Option 4")
    # This might be on one line or multiple lines. We'll handle it by looking for (1), (2), (3), (4)
    # First, let's just collect lines until we hit the next question or the end.
    
    # More robust way: process question blocks
    q_blocks = {}
    current_q = None
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        m = q_start_re.match(line)
        if m:
            current_q = int(m.group(1))
            q_blocks[current_q] = [m.group(2)]
        elif current_q is not None:
            # We skip lines containing Telugu. A simple heuristic: 
            # Telugu characters are in the Unicode range 0x0C00-0x0C7F.
            # We can also check if a line looks like an option line.
            has_telugu = any('\u0C00' <= c <= '\u0C7F' for c in line)
            if not has_telugu and not line.startswith('—————'):
                q_blocks[current_q].append(line)

    for q_no, block in sorted(q_blocks.items()):
        # Now we parse the block to separate question from options.
        question_lines = []
        options = {}
        
        # We need to find (1), (2), (3), (4)
        opt1_idx = -1
        opt2_idx = -1
        opt3_idx = -1
        opt4_idx = -1
        
        full_text = " ".join(block)
        
        # This is a bit tricky because options might be anywhere.
        # Let's try regex on the full text.
        opt_pattern = re.compile(r'\(\s*1\s*\)\s*(.*?)\s*\(\s*2\s*\)\s*(.*?)\s*\(\s*3\s*\)\s*(.*?)\s*\(\s*4\s*\)\s*(.*)')
        
        match = opt_pattern.search(full_text)
        if match:
            # Question is everything before the match
            question_text = full_text[:match.start()].strip()
            opt1, opt2, opt3, opt4 = match.groups()
            questions.append({
                "q_no": q_no,
                "question": question_text,
                "options": [opt1.strip(), opt2.strip(), opt3.strip(), opt4.strip()]
            })
        else:
            # Sometimes options might be split differently or one per line
            # Let's try another approach for this question.
            # Just look for lines starting with (1), (2), etc.
            question_text = []
            opt_lines = []
            for line in block:
                if re.match(r'^\(\s*[1-4]\s*\)', line):
                    opt_lines.append(line)
                else:
                    question_text.append(line)
                    
            opts_full = " ".join(opt_lines)
            match = opt_pattern.search(opts_full)
            if match:
                opt1, opt2, opt3, opt4 = match.groups()
                questions.append({
                    "q_no": q_no,
                    "question": " ".join(question_text).strip(),
                    "options": [opt1.strip(), opt2.strip(), opt3.strip(), opt4.strip()]
                })
            else:
                pass # Skipping or handling error

    return questions

def process_file():
    input_file = '/home/naveen/Videos/Chats/TGPLRB_Constable_Papers/Constable_2016_Prelims.pdf'
    output_file = '/home/naveen/Documents/TGPRB/extracted_questioin_paper_json/Constable_2016_Prelims.json'
    
    # Actually, we can use pdftotext to get cleaner text
    import subprocess
    subprocess.run(['pdftotext', '-layout', input_file, 'temp.txt'])
    
    with open('temp.txt', 'r', encoding='utf-8') as f:
        text = f.read()
        
    questions = extract_questions_from_text(text)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(questions, f, indent=4, ensure_ascii=False)
        
    print(f"Extracted {len(questions)} questions.")

if __name__ == '__main__':
    process_file()
