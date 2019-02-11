# Nasza gra

## 1. Projekt gry dzielimy na 3 elementy
    a) panel startowy
    b) właściwa gra
    c) dodatkowe ficzery gry (Highscores, informacja o aplikacji, autorzy)

## 3. Właściwa gra

## **Okno gry będzie zawierało:**
**HEADER**
- Tabela ze skrótami klawiszowymi
    - Zarządzanie ciężarówkami (A, S, D)
    - Przesuwanie klocka (strzałki w lewo i prawo)
    - Obracanie klocka (spacja)
    - Przesuwanie w dół (strzałka w dół)
    - Pauza (esc)

- Wynik
- (opcjonalnie) Podgląd jaki będzie następny klocek

**MAIN CONTAINER**

- Wielkość planszy:
    - 32 szerokości x 40 wysokości
    - Ciężarówki: 10 szerokości x 15 wysokości
    - Pomiędzy ciężarówkami (mur między garażami) - jedno pole szerokości i wysokość na 15 pól
    
## **Mechanika gry**

- Klocki poruszają się w interwale (1 sek) w dół z możliwością obracania w jedną stronę (za pomocą spacji)
- Szybkość spadania klocków będzie zwiększała się z każdym odjazdem ciężarówki (o 0.1 sek)
- Na pierwszy powrót ciężarówki będzie czekało się 10 sekund, na każdą kolejną 2 sekundy dłużej
- Gdy klocek spadnie w miejsce gdzie nie ma żadnej ciężarówki - odejmujemy 40 punktów i klocek znika
- Gdy klocek spadnie w miejsce gdzie jest mur między garażami - blokuje klocek w tym miejscu
- Gdy ciężarówka odjedzie, wyświetlamy timer pokazujący czas pozostały do przyjazdu ciężarówki
- Jeżeli klocek wystaję poza obszar ciężarówki - blokowany jest odjazd ciężarówki (wyświetlamy komunikat o tym)
- Logika zdobywania punktów:
    - 100% załadowanej ciężarówki = 200 punktów (20/10)
    - W przypadku odjazdu ciężarówki niewypełnionej w 100%, wynik liczony jest proporcjonalnie
- Zakończenie rozgrywki następuje kiedy gracz nie ma możliwości umieszenia klocka w żadnej ciężarówce 
    - ciężarówka jest zablokowana
    - nie ma ciężarówki w garażu

- Klocki wg. schematu z tetrisa     (https://codeincomplete.com/posts/javascript-tetris/) + klocki specjalne (wielkość x2)
- Wyniki zapisujemy w local storage


## Blok pauzy
- Blur tła gry
- Okienko na środku:
    - Akapit tekstu (PAUZA)
    - Akapit tekstu (Wynik gry)
    - Przycisk (Wznów grę)
    - Przycisk (Zagraj od nowa)
    - Przycisk (Koniec gry)

## Ekran startowy
- Logo aplikacji
- Akapit tekstu
- Przycisk rozpoczęcia
- (Rozwijany blok) Zasady gry
- Highscores (5 ostatnich wyników)

## Zadania na jutro tj 30.01
- Pełen backlog produktu
- Scrum (planowanie)
- Rozdzielenie zadań
- Najgorsze bebechy na początek
- Prezentacja gry (18.02)
- Pierwszy sprint kończy się 01.02
- Drugi sprint kończy się 08.02
- Trzeci sprint kosmetyczny (do 15.02)

## Rzeczy do researchu
- Jak obracać klocki w obszarze 4x4;
- Spadanie klocków
- Wykrywanie kolizji

