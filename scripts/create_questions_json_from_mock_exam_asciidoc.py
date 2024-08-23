import json
import re

import sys
from pathlib import Path

TABLE_PATTERN = re.compile(r'(?s).*?\|===\n(.*?\|===)')


def convert_asciidoc_to_json():
    mock_exam_questions_path = Path("examination-foundation-main/raw/mock_exam/docs/questions")
    if not mock_exam_questions_path.is_dir():
        print("Could not find mock exam questions, make sure the repo is placed at Path {}".format(
            mock_exam_questions_path))
        sys.exit(1)
    questions_de = []
    for file in sorted(mock_exam_questions_path.glob("question-*.adoc")):
        question_text = file.read_text("utf-8")
        german_version = get_document_parth_tagged_with_language(question_text, "DE")
        question_type, question_body = parse_question_type_de(german_version)
        question = {"id": file.name} | question_type
        if question_type.get("type") == "A-Frage":
            question_and_answers = parse_a_or_p_question(question_body)
        elif question_type.get("type") == "K-Frage":
            question_and_answers = parse_k_question(question_body)
        elif question_type.get("type") == "P-Frage":
            question_and_answers = parse_a_or_p_question(question_body)
        else:
            raise AttributeError("Unknown question type: " + question_type.get("type"))
        question = question | question_and_answers
        questions_de.append(question)
        # TODO do the same for the english version
    print(json.dumps(questions_de, indent=4))


def get_document_parth_tagged_with_language(asciidoc_content, language_code):
    pattern = re.compile(r'// tag::' + language_code + r'\[](.*?)// end::' + language_code + r'\[]', re.DOTALL)

    match = pattern.search(asciidoc_content)
    if not match:
        raise AttributeError("Could not find language tag for code in file")
    return match.group(1)


def parse_question_type_de(question_text):
    a_question_type_pattern = re.compile(r'\|\s*(A-Frage):\n\| (.*)', re.MULTILINE)
    p_question_type_pattern = re.compile(r'\|\s*(P-Frage):\n\| (.*)', re.MULTILINE)
    k_question_type_pattern = re.compile(r'\|\s*(K-Frage):\n\| (.*)', re.MULTILINE)
    points_pattern = re.compile(r'\|\s*(\d+)\s*Punkt', re.MULTILINE)

    type_and_instruction_match = a_question_type_pattern.search(question_text) or p_question_type_pattern.search(
        question_text) or k_question_type_pattern.search(question_text)
    points_match = points_pattern.search(question_text)

    end_of_header_pattern = TABLE_PATTERN
    match = end_of_header_pattern.search(question_text)
    footer = question_text[match.end():]

    return ({
                'type': type_and_instruction_match.group(1),
                'instruction': type_and_instruction_match.group(2),
                'points': points_match.group(1)
            }, footer)


def parse_a_or_p_question(question_body):
    end_of_question_pattern = re.compile(r"^\n\[cols", re.MULTILINE)
    match = end_of_question_pattern.search(question_body)
    question = question_body[:match.start()].strip()
    answers = parse_a_question_answers(question_body[match.end():])
    return {"question": question, "answers": answers}


def parse_a_question_answers(question_body):
    answer_matches = re.findall(r"\| \{([yn])\}\n\| \((\w)\)\n\| ([^|]+)", question_body)
    answers = []
    for match in answer_matches:
        answers.append({
            "option": match[1],
            "correct": match[0] == 'y',
            "text": match[2],
        })
    return answers


def parse_k_question(question_body):
    end_of_question_pattern = re.compile(r"^\n\[cols", re.MULTILINE)
    match = end_of_question_pattern.search(question_body)
    question = question_body[:match.start()].strip()
    match = re.search(r"\|===\n*\| (.*)\n\| (.*)\n\|", question_body)
    answers = parse_k_question_answers(question_body)

    return {"question": question, "first_choice": match.group(1), "second_choice": match.group(2), "answers": answers}


def parse_k_question_answers(question_body):
    answer_matches = re.findall(r"\| \{([yn])}\n\| \{([yn])}\n\| \((\w)\)\n\| ([^\n]+)", question_body)
    answers = []
    for match in answer_matches:
        answers.append({
            "option": match[2],
            "first_correct": match[0] == 'y',
            "second_correct": match[1] == 'y',
            "text": match[3],
        })
    return answers


if __name__ == "__main__":
    convert_asciidoc_to_json()
