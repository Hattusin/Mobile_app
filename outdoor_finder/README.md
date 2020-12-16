# Helsingin ulkoilupaikat

Tämä on AMKoodari mobiiliohjelmointi-kurssin loppuprojekti

Projetissa tarkoituksena oli luoda applikaatio, jossa käyttä antamalla luvan löytää lähimmän ulkoulureitin Helsingistä sekä tiedon kuinka kaukana se on omasta sijainnista. Lisäksi käyttäjä pystyy näkemään kartalta muita paikkoja sekä niiden etäisyyden itsestään.

### Projetikssa on käytetty paketit:

- [React Native Maps](https://github.com/react-native-maps/react-native-maps)
- [Expo Location](https://www.npmjs.com/package/expo-location)
- [Geolib](https://www.npmjs.com/package/geolib)
- [nativebase.io](https://docs.nativebase.io/)


### Data lähde

[Löydä Helsingin luonto](https://citynature.eu/fi/helsinki/)

Data url: [https://citynature.eu/api/wp/v2/places?cityid=5](https://citynature.eu/api/wp/v2/places?cityid=5)


### Applikaatio

- Yleisnäkymä avautuu Helsingin keskustaan ja käyttäjältä pyydetään lupa käyttää sijaintia

<img src="https://github.com/Hattusin/Mobile_app/blob/master/outdoor_finder/images/helsinginkeskusta.png" width="30%" height="30%">

- Näkymä kaikista luontopoluista sekä ylhäältä *Tassu* ikonista löytää tietoa applikaatiosta

<p float="left">
    <img src="https://github.com/Hattusin/Mobile_app/blob/master/outdoor_finder/images/view_outdoorplaces.png" width="30%" height="30%">
    <img src="https://github.com/Hattusin/Mobile_app/blob/master/outdoor_finder/images/Applikaatio_info.PNG" width="30%" height="30%">
</p>
- Kun käyttäjä valitsee paikan se keskitetään ruudulle. Kun paikka on valittu aktivoituu *Ulkoilu Paikan Tiedot* nappi, josta löytää etäisyys tiedon.

<p float="left">
    <img src="https://github.com/Hattusin/Mobile_app/blob/master/outdoor_finder/images/vallisaari.PNG" width="30%" height="30%">
    <img src="https://github.com/Hattusin/Mobile_app/blob/master/outdoor_finder/images/vallisaari_tiedot.PNG" width="30%" height="30%">

</p>

- Sallimalla sijainti tiedon välittämisen on mahdollista hakea lähin luontopolku.

<p float="left">
    <img src="https://github.com/Hattusin/Mobile_app/blob/master/outdoor_finder/images/olet_tassa.PNG" width="30%" height="30%">
    <img src="https://github.com/Hattusin/Mobile_app/blob/master/outdoor_finder/images/lahin_paikka.PNG" width="30%" height="30%">

</p>



