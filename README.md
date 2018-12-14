# Store

Store je state management řízený pomocí RxJS pro Angular aplikace inspirovaný konceptem Redux. Store je kontrolován pomocí 'stavu aplikace(state)', který nám umožnuje konzistentní vývoj aplikace.

## Klíčové koncepty

- Akce(Actions) popisují jednotlivé události, které jsou zpracovány(dispatched) z komponent nebo ze servis(services)
- Změny stavu(state) jsou vždy řízeny pomocí ryzí funkce(pure functions), které nazýváme reducers, reducer vždy vezme poslední dostupnou akci a vypočítá na základě toho vždy nový stav.
- Selektor(Selectors) jsou ryzí funkce, které vyberou, případně složí přes sebe části již uloženého stavu.
- Stav(State) je napřímo přístupný ze `Store`, vždy jako observable stavu a jako observer akcí.
