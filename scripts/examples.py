ENGLISH_QUESTION = """
=== Question 1
**ID: Q-20-04-01**

[cols="2,8,2", frame=ends, grid=rows]
|===
| A-Question:
| Choose one answer.
| 1 point
|===


How many definitions of “software architecture” exist?

[cols="1a,1,8", frame="none", grid="none"]
|===

| {n}
| (a)
| Exactly one for all kinds of systems.

| {n}
| (b)
| One for every kind of software system (e.g. “embedded”, “real-time”, “decision support”, “web”, “batch”, ...).

| {y}
| (c)
| A dozen or more different definitions.

|===

"""

GERMAN_P_QUESTION_BODY = """

Welche DREI der folgenden Grundsätze gelten für das Testen?

[cols="1a,1,10", frame=none, grid=none]
|===

| {y}
| (a)
| Im Allgemeinen ist es nicht möglich, sämtliche Fehler eines Systems zu finden.

| {y}
| (b)
| Bei Komponenten mit vielen bekannten vorherigen Fehlern sind die Chancen für zusätzliche Fehler hoch.

| {n}
| (c)
| Durch ausreichendes Testen kann aufgezeigt werden, dass ein Programm fehlerfrei ist.

| {y}
| (d)
| Durch Testen kann nur die Existenz von Fehlern aufgezeigt werden, nicht jedoch ihre Abwesenheit.

| {n}
| (e)
| Die funktionale Programmierung erlaubt keine automatisierten Tests.
|===
"""

GERMAN_P_QUESTION = """
=== Frage 6
**ID: Q-17-13-04**

[cols="2,8,2", frame=ends, grid=rows]
|===
| P-Frage:
| Wählen Sie aus den folgenden fünf Antworten die **drei** Antworten aus, die am besten passen.
| 1 Punkt
|===
""" + GERMAN_P_QUESTION_BODY


GERMAN_A_QUESTION_BODY = """

Wie viele Definitionen des Begriffes "Softwarearchitektur" gibt es?

[cols="1a,1,8", frame="none", grid="none"]
|===

| {n}
| (a)
| Genau eine für alle Arten von Systemen.

| {n}
| (b)
| Eine für jede Art von Softwaresystem (z.{nbsp}B. "eingebettet", "Echtzeit", "Entscheidungsunterstützung", "Web", "Batch", …)

| {y}
| (c)
| Ein Dutzend oder mehr unterschiedliche Definitionen.
|===

"""
GERMAN_A_QUESTION = """

=== Frage 1
**ID: Q-20-04-01**

[cols="2,8,2", frame=ends, grid=rows]
|===
| A-Frage:
| Bitte kreuzen Sie die richtige Antwort an.
| 1 Punkt
|===
""" + GERMAN_A_QUESTION_BODY

GERMAN_K_QUESTION_BODY = """

Welche der folgenden Aussagen zum Entwurfsprinzip "Information Hiding" sind richtig und welche falsch?


[cols="2a,2a,1, 7", frame=none, grid=none]
|===

| Richtig
| Falsch
|
|

| {y}
| {n}
| (a)
| Durch die Befolgung des Prinzips "Information Hiding" wird die Flexibilität für Änderungen erhöht.

| {y}
| {n}
| (b)
| Beim Information Hiding werden absichtlich Informationen vor Aufrufern oder Konsumenten des Bausteins verborgen.

| {n}
| {y}
| (c)
| Information Hiding erschwert das Bottom-Up Vorgehen.

| {n}
| {y}
| (d)
| Information Hiding ist abgeleitet vom Ansatz der inkrementellen Verfeinerung entlang des Kontrollflusses.
|===
"""

GERMAN_K_QUESTION = """
=== Frage 7
**ID: Q-17-13-05**

[cols="2,8,2", frame=ends, grid=rows]
|===
| K-Frage:
| Bitte ordnen Sie jede Antwort einer Kategorie zu.
| 2 Punkte
|===
""" + GERMAN_K_QUESTION_BODY
