// KARTLAR
const kartlar = [
  // ANA KARTLAR
  ["balik"],
  ["kedi"],
  ["penguen"],
  ["kaplumbaga"],
  ["sincap"], 
  ["zurafa"],
  ["at"],
  ["fil"],
  ["inek"],
  ["kus"],
  ["ordek"],
  ["kurbaga"],
  
  // EŞLERİ
  ["balik2"],
  ["kedi2"],
  ["penguen2"],
  ["kaplumbaga2"],
  ["sincap2"], 
  ["zurafa2"],
  ["at2"],
  ["fil2"],
  ["inek2"],
  ["kus2"],
  ["ordek2"],
  ["kurbaga2"]
];

// EKLENMİŞ KARTLAR
var eklenenkartlar = [];

// KARTLARIN YERLERİ
for (let i = 1; i <= 24; i++){
  // KONUM SEÇ
  let konum = i;

  // KART SEÇ
  var rng = RNG(1, kartlar.length, "Kart Seçimi") - 1;
  
  // DAHA ÖNCE SEÇİLMEYEN Vİ KART SEÇİLENE KADAR YENİDEN KART SEÇ
  while (eklenenkartlar.includes(rng.toString())){
    var rng = RNG(1, kartlar.length, "Yeniden Kart Seçimi") - 1;
  }
  
  eklenenkartlar.push(rng.toString());
  let kart = kartlar[rng];
  
  // ELEMENT
  let elem = '<img id="' + kart[0] + '" src="resimler/kartarkasi.jpg">';
  
  // YERLEŞTİR
  $("#" + konum).html(elem);
}

// BOY EŞİTLEME
// max yükseklik
var maxY = 0; 

for (i = 1; i <= 24; i++){
  var y = $("#" + i).height();
  if (y > maxY) var maxY = y;
}

$(".col").height(maxY);

// RESIMLERE SEÇME ATA
$("img").attr("onclick", "sec($(this))");

// SEÇME FONKSIYONU
secilen = [];
eslesenler = 0;
function sec(elem){
  var hayvan = elem.attr("id");
  if (secilen.includes(hayvan)) return 0;
  if (secilen.length >= 2) return 0;
  
  if (hayvan.includes("2")) hayvanadi = hayvan.replace("2", "");
  else hayvanadi = hayvan;
  
  elem.attr("src", "resimler/" + hayvanadi + ".jpg");
  
  secilen.push(hayvan);
  
  if (secilen.length == 2){
    setTimeout(function(){
      if (secilen[0].includes(secilen[1]) || secilen[1].includes(secilen[0])){
        $("#" + secilen[0] + ", #" + secilen[1]).attr("src", "resimler/bos.png").css("z-index", "-10");
        eslesenler ++;
        if (eslesenler == 12) {
          alert("OYUN BİTTİ!");
          location.reload();
        }
      } else {
        $("img").attr("src", "resimler/kartarkasi.jpg");
      }
    
      secilen = [];
    }, 1000);
  }
}

// RNG FONKSİYONU
function RNG(min, max, aciklama){
  r = Math.floor(Math.random() * (max - min + 1) + min);
  
  if (aciklama){
    console.log("RNG = " + r + " (" + aciklama + ")");
  } else {
   console.log("RNG = " + r);
  }
 
  return r;
}
