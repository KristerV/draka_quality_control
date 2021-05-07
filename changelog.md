# Changelog

## 7.05.2021

- [x] 9 tulpa kokku. Lisada L4-valge, L5-punane, L6, L7
- [x] Numbreid saab kirjutada komaga
- [x] Tulpade nimetused ümber muudetud
- [x] Font on liiga kribu, teha loetavamaks

## Tellimus 4500608848 20.11.2015

### Üldisemad muudatused

- [x] Tooted -> Toote mõõtmised
- [x] Pealehe tabelisse ka loomise ja mõõtmise kuupäevad
- [x] Pealehele kirjelduse filter
- [x] Pealehel sortimine "toote parameeter" ja "tootekirjeldus" järgi

### Mõõtmiste graafiku muudatused

- [x] Eemaldada legend
- [x] Graafikul hiirega peale minnes näita toote kirjeldust pealkirjas pärast kuupäeva
- [x] % ülekulu märkida = ((Nõue – Mõõdetud) / Nõue) \* 100
- [x] Üle on punased, alla on sinised.

- [x] Esimene graafik
  - [x] Pikkuseks viimased 30
- [x] Kuu graafik eemaldada
- [x] Aasta graafik
  - [x] näidata kuu keskmisi, mitte igat mõõtmist
  - [x] muudetav ajapikkus

### KSM moodul

- [x] Failid tulevad kaustast U:\KSM\data
- [x] Failist noppida tulbad
  - [x] Measure time - millisele ajajoonele läheb vastav mõõtmine
  - [x] Extra1 - Liini number, ehk graafiku nimi
  - [x] Wall_extra_present - Mõõtmis tulemus "%-diline ülepaksus"
- [x] Liin 6, Liin 22, Liin 21, Liin 38, Liin 36 (2 katet), Liin 8
- [x] Graafik
  - [x] Iga liini kohta eraldi graafik
  - [x] Näha on 20 viimast mõõtmist
  - [x] Aja ulatust saab nihutada
  - [x] y-telg on protsendiline ülepaksus ja x-telg on aeg
  - [x] ülekulu on punane, normis on sinine (hetkel roheline)
  - [x] Kaks vahetust, kaks tulpa
    - [x] päevane vahetus 7.00 -> 19.00 (kollasega võiks märkida graafikul)
    - [x] öine vahetus 19.00 -> 7:00 (sinisega graafik või postid)

### Lisa

- [x] productListis pealkirjad hüppavad üksteise otsa
