# Changelog

## Tellimus 4500608848 20.11.2015

### Üldisemad muudatused

- [ ] Tooted -> Toote mõõtmised
- [ ] Pealehe tabelisse ka loomise ja mõõtmise kuupäevad
- [ ] Pealehele kirjelduse filter
- [ ] Pealehel sortimine "toote parameeter" ja "tootekirjeldus" järgi

### Graafiku muudatused

- [ ] Esimene graafik
    - [ ] Graafikul hiirega peale minnes näita toote kirjeldust pealkirjas pärast kuupäeva
    - [ ] Muudetava ajapikkusega graafik, default 8 päeva või viimased 30
    - [ ] % ülekulu märkida. Üle on punased, alla on sinised.
    - [ ] %-diline takistuse ülekulu = ((Nõue – Mõõdetud) / Nõue) * 100
- [ ] Kuu graafik eemaldada
- [ ] Aasta graafikul näidata kuu keskmisi

### KSM moodul

- [ ] Failid tulevad kaustast U:\KSM\data
- [ ] Failist noppida tulbad
    - [ ] Measure time - millisele ajajoonele läheb vastav mõõtmine
    - [ ] Extra1 - Liini number, ehk graafiku nimi
    - [ ] Wall_extra_present - Mõõtmis tulemus "%-diline ülepaksus"
- [ ] Liin 6, Liin 22, Liin 21, Liin 38, Liin 36 (2 katet), Liin 8
- [ ] Graafik
    - [ ] Iga liini kohta eraldi graafik
    - [ ] Näha on 20 viimast mõõtmist ja seda saab nihutada.
    - [ ] y-telg on protsendiline ülepaksus ja x-telg on aeg
    - [ ] ülekulu on punane, normis on sinine
    - [ ] Kaks vahetust, kaks tulpa
        - [ ] päevane vahetus 7.00 -> 19.00 (kollasega võiks märkida graafikul)
        - [ ] öine vahetus 19.00 -> 7:00 (sinisega graafik või postid)
