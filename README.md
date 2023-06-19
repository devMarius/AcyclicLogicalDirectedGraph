# AcyclicLogicalDirectedGraph
class AcyclicLogicalDirectedGraph (js)


## Example mermaid graph 

```mermaid
graph LR
  N(Nieefektywność paneli roboczych) --> AND1(Gdy występują razem)
  AND1 --> Z1(Niedostrzeganie wartości paneli)
  AND1 --> Z2(Brak zaangażowania kluczowych osób)
  Z1 --> OR1(Gdy występuje jakikolwiek)
  OR1 --> Z1a(Utrzymanie niskiego zainteresowania)
  OR1 --> Z1b(Słaba promocja paneli)
  Z1a --> AND4(Gdy występują razem)
  AND4 --> Z1a1(Nieatrakcyjne tematy dyskusji)
  AND4 --> Z1a2(Złe wrażenia uczestników)
  Z1a2 --> OR4(Gdy występuje jakikolwiek)
  OR4 --> Z1a2a(Ograniczony wpływ uczestników)
  OR4 --> Z1a2b(Dyskusja nieodpowiadająca oczekiwaniom)
  Z1a1 --> AND11(Gdy występują razem)
  AND11 --> Z1a1a(Słaby dobór tematy dyskusji dla posiedzeń)
  AND11 --> Z1a1b(Niepraktyczne propozycje dyskusji)
  Z1a2a --> OR9(Gdy występuje jakikolwiek)
  OR9 --> Z1a2a1(Niewypromowane osiągnięcia uczestników)
  OR9 --> Z1a2a2(Niejasne zasady oceny wpływu uczestników)
  Z1a1a --> AND14(Gdy występują razem)
  AND14 --> Z1a1a1(Niewystarczająca różnorodność tematów)
  AND14 --> Z1a1a2(Niejasne kryteria wyboru tematów)
  Z1a1b --> AND15(Gdy występują razem)
  AND15 --> Z1a1b1(Brak dostępnych danych i źródeł)
  AND15 --> Z1a1b2(Brak aktualnych informacji)
  Z1a2a1 --> OR10(Gdy występuje jakikolwiek)
  OR10 --> Z1a2a1a(Słaba wizualizacja osiągnięć)
  OR10 --> Z1a2a1b(Niewłaściwy kanał komunikacji osiągnięć)
  Z1a2a2 --> AND16(Gdy występują razem)
  AND16 --> Z1a2a2a(Ocena oparta jedynie na ilości)
  AND16 --> Z1a2a2b(Ukrywanie ważnych kryteriów oceny)
  Z1a2b --> AND17x(Gdy występuje jakikolwiek)
  AND17x --> AND17(Gdy występują razem)
  AND17 --> Z1a2b1a(Niewłaściwe przygotowanie panelistów)
  AND17 --> Z1a2b1b(Niezrozumienie celu panelu)
  AND17x --> AND18(Gdy występują razem)
  AND18 --> Z1a2b2a(Słabo przygotowane prezentacje)
  AND18 --> Z1a2b2b(Brak możliwości komunikacji z panelistami)
  Z2 --> OR2(Gdy występuje jakikolwiek)
  OR2 --> Z2a(Niedobór ekspertów)
  OR2 --> Z2b(Brak zadowolenia uczestników)
  Z1b --> AND2(Gdy występują razem)
  AND2 --> Z1b1(Niewystarczający budżet na promocję)
  AND2 --> Z1b2(Nieatrakcyjne działania promocyjne)
  Z2a --> AND5(Gdy występują razem)
  AND5 --> Z2a1(Zerwanie współpracy ze środowiskami akademickimi)
  AND5 --> Z2a2(Niewłaściwa rekrutacja ekspertów)
  Z2b --> AND3(Gdy występują razem)
  AND3 --> Z2b1(Niewspierająca atmosfera współpracy)
  AND3 --> Z2b2(Ograniczone poczucie wpływu uczestników)
  Z1b1 --> OR5(Gdy występuje jakikolwiek)
  OR5 --> Z1b1a(Niedostateczne środki na reklamę)
  OR5 --> Z1b1b(Limitowana promocja w mediach)
  Z1b2 --> AND8(Gdy występują razem)
  AND8 --> Z1b2a(Niewłaściwa selekcja strategii promocji)
  AND8 --> Z1b2b(Nieefektywna współpraca z agencjami reklamowymi)
  Z2a1 --> OR6(Gdy występuje jakikolwiek)
  OR6 --> Z2a1a(Pogorszenie kontaktów z wyższymi uczelniami)
  OR6 --> Z2a1b(Niewystarczające wsparcie dla koordynacji współpracy)
  Z2a2 --> AND7(Gdy występują razem)
  AND7 --> Z2a2a(Niezdefiniowane wymagania dla ekspertów)
  AND7 --> Z2a2b(Nieodpowiednie kryterium selekcji ekspertów)
  Z2b1 --> OR3(Gdy występuje jakikolwiek)
  OR3 --> Z2b1a(Niejasne cele posiedzeń)
  OR3 --> Z2b1b(Niewystarczające umiejętności współpracy)
  Z2b2 --> Z2b2a(Niewłaściwa organizacja paneli)
  Z2b1a --> AND9(Gdy występują razem)
  AND9 --> Z2b1a1(Nie sprecyzowane cele posiedzeń)
  AND9 --> Z2b1a2(Pracowaanie na podstawie przestarzałych dokumentów)
  Z2b1b --> AND10(Gdy występują razem)
  AND10 --> Z2b1b1(Słabe wykorzystanie istniejących umiejętności)
  AND10 --> Z2b1b2(Brak komunikacji)
  Z2b2a --> AND6(Gdy występują razem)
  AND6 --> Z2b2a1(Niedopasowana struktura paneli)
  AND6 --> Z2b2a2(Słabe wsparcie dla uczestników paneli)
  Z2b2a1 --> OR7(Gdy występuje jakikolwiek)
  OR7 --> Z2b2a1a(Słaba efektywność pracy w grupie)
  OR7 --> Z2b2a1b(Niewłaściwe podejście do rozwiązywania problemów)
  Z2b2a2 --> AND13(Gdy występują razem)
  AND13 --> Z2b2a2a(Ślaby dostęp do informacji)
  AND13 --> Z2b2a2b(Słaba pomoc techniczna)
```

How to use class:
```javascript
let mermaid = `graph LR
  N(Nieefektywność paneli roboczych) --> AND1(Gdy występują razem)
  AND1 --> Z1(Niedostrzeganie wartości paneli)
  AND1 --> Z2(Brak zaangażowania kluczowych osób)
  Z1 --> OR1(Gdy występuje jakikolwiek)
  ...
`;

let graph = AcyclicLogicalDirectedGraph.fromMermaid(mermaid);
console.log(graph.calculateVertexSmartDepthMap()); // Show the strength (depth) of logically dependent vertexes 
//...

console.log(graph.toMermaid()); // Convert instance of AcyclicLogicalDirectedGraph to mermaid string
```
