from pathlib import Path

from create_questions_json_from_mock_exam_asciidoc import get_document_parth_tagged_with_language, \
    parse_question_type_de, parse_a_or_p_question
from examples import *
from scripts.create_questions_json_from_mock_exam_asciidoc import parse_k_question


def test_parse_language_sections():
    example_question_content = Path("example-a-question.adoc").read_text("utf-8")
    assert get_document_parth_tagged_with_language(example_question_content, "DE") == GERMAN_A_QUESTION
    assert get_document_parth_tagged_with_language(example_question_content, "EN") == ENGLISH_QUESTION


def test_determining_question_type_de():
    question_type, question_body = parse_question_type_de(GERMAN_A_QUESTION)
    assert question_type == {
        "type": "A-Frage",
        "instruction": "Bitte kreuzen Sie die richtige Antwort an.",
        "points": "1"
    }
    assert question_body == "\n" + GERMAN_A_QUESTION_BODY
    question_type, _ = parse_question_type_de(GERMAN_P_QUESTION)
    assert question_type == {
        "type": "P-Frage",
        "instruction": "Wählen Sie aus den folgenden fünf Antworten die **drei** Antworten aus, die am besten passen.",
        "points": "1"
    }
    question_type, _ = parse_question_type_de(GERMAN_K_QUESTION)
    assert question_type == {
        "type": "K-Frage",
        "instruction": "Bitte ordnen Sie jede Antwort einer Kategorie zu.",
        "points": "2"
    }


def test_parse_a_question():
    question = parse_a_or_p_question(GERMAN_A_QUESTION_BODY)
    assert question["question"] == 'Wie viele Definitionen des Begriffes "Softwarearchitektur" gibt es?'
    assert question["answers"] == [
        {"option": "a",
         "correct": False,
         "text": "Genau eine für alle Arten von Systemen."},
        {"option": "b",
         "correct": False,
         "text": 'Eine für jede Art von Softwaresystem (z.{nbsp}B. "eingebettet", "Echtzeit", '
                 '"Entscheidungsunterstützung", "Web", "Batch", …)'},
        {"option": "c",
         "correct": True,
         "text": 'Ein Dutzend oder mehr unterschiedliche Definitionen.'},
    ]


def test_parse_k_question():
    question = parse_k_question(GERMAN_K_QUESTION_BODY)
    assert question["question"] == ('Welche der folgenden Aussagen zum Entwurfsprinzip "Information Hiding" sind '
                                    'richtig und welche falsch?')
    assert question["first_choice"] == "Richtig"
    assert question["second_choice"] == "Falsch"
    assert question["answers"] == [
        {
            "option": "a",
            "first_correct": True,
            "second_correct": False,
            "text": 'Durch die Befolgung des Prinzips "Information Hiding" wird die Flexibilität für Änderungen erhöht.'
        },
        {
            "option": "b",
            "first_correct": True,
            "second_correct": False,
            "text": 'Beim Information Hiding werden absichtlich Informationen vor Aufrufern oder Konsumenten des Bausteins verborgen.'
        },
        {
            "option": "c",
            "first_correct": False,
            "second_correct": True,
            "text": 'Information Hiding erschwert das Bottom-Up Vorgehen.'
        },
        {
            "option": "d",
            "first_correct": False,
            "second_correct": True,
            "text": 'Information Hiding ist abgeleitet vom Ansatz der inkrementellen Verfeinerung entlang des Kontrollflusses.'
        },
    ]


def test_parse_p_question():
    question = parse_a_or_p_question(GERMAN_P_QUESTION_BODY)
    assert question["question"] == ('Welche DREI der folgenden Grundsätze gelten für das Testen?')
    assert question["answers"] == [
        {"option": "a",
         "correct": True,
         "text": 'Im Allgemeinen ist es nicht möglich, sämtliche Fehler eines Systems zu finden.'},
        {"option": "b",
         "correct": True,
         "text": 'Bei Komponenten mit vielen bekannten vorherigen Fehlern sind die Chancen für zusätzliche Fehler hoch.'},
        {"option": "c",
         "correct": False,
         "text": 'Durch ausreichendes Testen kann aufgezeigt werden, dass ein Programm fehlerfrei ist.'},
        {"option": "d",
         "correct": True,
         "text": 'Durch Testen kann nur die Existenz von Fehlern aufgezeigt werden, nicht jedoch ihre Abwesenheit.'},
        {"option": "e",
         "correct": False,
         "text": 'Die funktionale Programmierung erlaubt keine automatisierten Tests.'},
    ]
