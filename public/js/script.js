document.addEventListener("DOMContentLoaded", function () {
    const weightInput = document.getElementById("weight");
    const heightInput = document.getElementById("height");
    const ageInput = document.getElementById("age");
    const genderInput = document.getElementById("gender")
    const calculateButton = document.getElementById("calculate");
    const resultDiv = document.getElementById("result");

    calculateButton.addEventListener("click", calculateBMI);

    function calculateBMI() {
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value);
        const age = parseFloat(ageInput.value);
        const gender = parseFloat(genderInput.value);

        if (!isNaN(weight) && !isNaN(height) && height > 0) {
            const bmi = calculateBMIValue(weight, height);
            const category = determineBMICategory(bmi);

            resultDiv.innerHTML = `Your BMI is ${bmi.toFixed(2)} (${category})`;
            const data = {
                weight: weight,
                height: height,
                age: age,
                gender: gender,
                bmi: bmi
            };
            // Send a POST request with JSON data
            fetch("/calculate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(responseData => {
                    // Handle the response here if needed
                    console.log("POST response:", responseData);
                })
                .catch(error => {
                    console.error("Error sending POST request:", error);

                });
            location.reload();
        } else {
            resultDiv.innerHTML = "Please enter valid weight and height values.";
        }
    }

    function calculateBMIValue(weight, height) {
        const cmtom = height / 100
        return weight / (cmtom * cmtom);
    }

    function determineBMICategory(bmi) {
        if (bmi < 18.5) {
            return "Underweight";
        } else if (bmi >= 18.5 && bmi < 25) {
            return "Normal weight";
        } else if (bmi >= 25 && bmi < 30) {
            return "Overweight";
        } else {
            return "Obese";
        }
    }
});

const xhr = new XMLHttpRequest();
xhr.open('GET', '/data');
xhr.onload = () => {
    if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        console.log(data);
        const tableBody = document.querySelector('#data-table tbody');

        // Loop through the data and add it to the table
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${data.weight}</td>
            <td>${data.height}</td>
            <td>${data.age}</td>
            <td>${data.gender === false ? 'male' : data.gender === true ? 'female' : 'null'}</td>
            <td id="bmi">${data.bmi.toFixed(2)}</td>
        `;
        tableBody.appendChild(tr);
    }
};

async function getBMI() {
    // wait for the response from the server
    xhr.send();
    try {
        await fetch('/data');
        const bmi = parseFloat(document.querySelector('#bmi').textContent);
        const container = document.querySelector('#res');
        if (bmi < 18.5) {
            container.innerHTML = '<header>    <h1>Underweight</h1></header><section id="definition">    <h2>Definition</h2>    <p>        Underweight menandakan kondisi berat badan yang kurang dari ukuran BMI normal. Tanda paling menonjol adalah        mengalami berat badan kurang yakni tubuhnya terlihat kurus dan berat badannya kurang.    </p></section><section id="risks">    <h2>Resiko</h2>    <p>        Rentan terserang penyakit infeksi, sulit berkonsentrasi, mudah lelah, hingga tidak berenergi saat beraktivitas.    </p></section><section id="diet-recommendation">    <h2>Rekomendasi Diet</h2>    <p>        Diet TKTP (tinggi karbohidrat tinggi protein). Prinsipnya adalah mengonsumsi makanan tinggi karbohidrat        (utamakan karbohidrat kompleks), protein tinggi, lemak cukup. Jangan lupa tetap konsumsi sayur 3-4 porsi dan        buah 2-3 porsi sehari, serta minum air putih 8 gelas/hari. Anjuran penambahan berat badan ialah 0,5-1 kg/minggu.        Hal ini dapat dicapai dengan menambahkan kalori sekitar 500 kkal/hari. Cara ini bisa dilakukan secara bertahap        agar tidak berlebihan.    </p>    <!-- Add more diet recommendations and information here --></section><section id="menu">    <h2>Rekomendasi Menu Makan</h2>    <ul>        <li>🥛🧃 Susu berprotein tinggi, jus buah, smoothies,</li>        <li>🥬🍌 Sayur, buah,</li>        <li>🍗🥩🥚 Ikan, daging sapi, daging ayam, telur, tahu, tempe,</li>        <li>vitamin A (susu, keju, telur ayam, dan jenis buah sayur berwarna kuning kemerahan : wortel, jeruk)</li>        <li>vitamin B, B2, B3, B6, B12 (daging sapi, daging ayam, ikan, kacang-kacangan, telur, susu, keju, dan kedelai)        </li>        <li>Vitamin C (stroberi, kiwi, jeruk, brokoli, tomat, dan berbagai sayur berdaun hijau tua) </li>        <li>Vitamin D (berjemur, minyak ikan, salmon, susu)</li>        <li>Vitamin E (biji-bijian gandum, sayur daun hijau, kuning telur, kacang-kacangan)</li>        <li>Vitamin K (sayuran hijau, minyak kedelai, yoghrut)</li>        <!-- Add more menu items here -->    </ul>    <!-- Add more dietary recommendations and information here --></section><section id="more-exercise-recommendation">    <h3>Push Up</h3>    <p>        Membentuk otot tubuh bagian atas seperti lengan dan bahu (bodyweight exercise)    </p>    <ul>        <li>Tengkuraplah di lantai.</li>        <li>Letakkan telapak tangan di permukaan lantai dan sejajarkan dengan bahu.</li>        <!-- Add more steps for Push Up -->    </ul>    <p>‼️ Lakukan berulang kali sesuai dengan kekuatan tubuh.</p>    <h3>Pull-up</h3>    <p>        Menambah kekuatan otot bagian lengan dan bahu (bodyweight exercise).    </p>    <ul>        <li>Pegang palang tumpuan yang posisinya lebih tinggi dari tubuh Anda dengan kedua tangan.</li>        <li>Posisikan lengan Anda lurus selebar bahu.</li>        <!-- Add more steps for Pull-up -->    </ul>    <p>‼️ Gerakan ini dapat diulangi sebanyak yang diinginkan dan sesuai dengan ketahanan tubuh Anda.</p>    <h3>Dumbbell Shoulder Squat</h3>    <p>        Gerakan ini bertujuan untuk memperkuat otot paha depan, paha belakang, pinggul, dan bahu.    </p>    <ul>        <li>Pegang dumbbell di kedua tangan lalu tekuk siku sehingga dumbbell berada di atas bahu.</li>        <li>Buka kaki selebar pinggul dengan tumit sebagai tumpuannya.</li>        <!-- Add more steps for Dumbbell Shoulder Squat -->    </ul>    <p>‼️ Gunakan dumbbell yang ringan jika Anda baru melakukan olahraga untuk menambah berat badan ini. Anda juga bisa        mengganti dumbbell dengan sepasang botol yang telah diisi dengan air.</p>    <h3>Traditional Flat Bench Press</h3>    <p>        Melatih otot dada, bahu, dan lengan.    </p>    <ul>        <li>Berbaring telentang di bangku yang datar, lalu cengkeram barbell. Pastikan posisi tangan sedikit lebih lebar            dari bahu dan bilah barbell berada tepat di atas bahu Anda.</li>        <!-- Add more steps for Traditional Flat Bench Press -->    </ul>    <p>‼️ Gerakan ini dapat dilakukan hingga 3 set, dengan 5–10 pengulangan untuk setiap set.</p>    <h3>Kettlebell Swing</h3>    <p>        Menguatkan otot seluruh tubuh.    </p>    <ul>        <li>Pegang kettlebell dengan kedua tangan dan buka kaki selebar pinggul.</li>        <!-- Add more steps for Kettlebell Swing -->    </ul>    <p>‼️ Anda harus menggunakan kekuatan pinggul, bukan kekuatan lengan, agar kettlebell terasa ringan saat diangkat ke        atas. Gerakan kettlebell swing ini dapat diulangi hingga 16 kali atau sesuai dengan kekuatan tubuh.</p></section>';
        } else if (bmi >= 18.5 && bmi < 25) {
            container.innerHTML = '<section>    <h1>Normal</h1>    <h2>Risiko</h2>    <ul>        <li>Memiliki berat badan ideal dapat mengurangi risiko berbagai penyakit, termasuk penyakit jantung, diabetes            tipe 2, dan tekanan darah tinggi. Selain itu, berat badan yang sehat juga mendukung fungsi sistem tubuh            lainnya. Konsisten dengan gaya hidup sehat, termasuk pola makan seimbang dan aktivitas fisik teratur, dapat            membantu menjaga berat badan dalam kisaran yang direkomendasikan oleh ahli kesehatan.</li>    </ul>    <h2>Rekomendasi Diet</h2>    <p>Untuk menjaga berat badan tetap ideal, yang dapat dilakukan adalah menjaga tubuh agar tetap terhidrasi sehingga        melancarkan metabolisme tubuh untuk menjaga berat badan tetap terkontrol. Kemudian pastikan tubuh mendapatkan        asupan gizi seimbang dari sayur mayur, sumber protein dan lemak sehat, karbohidrat kompleks, serta buah-buahan        untuk mencukupi nutrisi tubuh.</p>    <h2>Rekomendasi Menu Makanan</h2>    <ul>        <li>            <h2>Sayur-Mayur:</h2> Contoh: Sayur hijau seperti bayam, brokoli, dan kacang panjang. Penjelasan:            Sayuran hijau kaya akan serat, vitamin, dan mineral yang mendukung kesehatan tubuh secara keseluruhan.        </li>        <li>            <h2>Protein:</h2> Contoh: Ayam panggang, ikan salmon, atau tahu dan tempe bagi yang vegetarian.            Penjelasan: Protein diperlukan untuk pembentukan dan perbaikan jaringan tubuh, serta menjaga kekuatan otot.        </li>        <li>            <h2>Lemak Sehat:</h2> Contoh: Kacang-kacangan, dan minyak zaitun. Penjelasan: Lemak sehat, terutama            asam lemak omega-3 dan omega-6, penting untuk kesehatan jantung dan fungsi otak.        </li>        <li>            <h2>Karbohidrat Kompleks:</h2> Contoh: Kentang, beras merah, atau quinoa. Penjelasan: Karbohidrat            kompleks memberikan energi secara bertahap dan mengandung serat yang baik untuk pencernaan.        </li>        <li>            <h2>Buah-Buahan:</h2> Contoh: Apel, stroberi, atau pisang. Penjelasan: Buah-buahan mengandung            vitamin, mineral, serat, dan antioksidan yang mendukung sistem kekebalan tubuh dan kesehatan seluler.        </li>    </ul>    <h2>Exercise</h2>    <p>Seseorang yang ingin memiliki berat badan ideal paling tidak harus berolahraga selama 150 menit untuk intensitas        sedang. Selain itu, 75 menit untuk aktivitas yang berat setiap minggunya. Olahraga yang dapat dilakukan misalnya        berlari, yoga, crunch, dan plank.</p>    <h2>Lari:</h2>    <p>Menghidari cedera saat berlari dengan beberapa langkah:</p>    <ol>        <li>Hadapkan pandangan ke depan</li>        <li>Tegakkan dada dan jaga tubuh tetap rileks</li>        <li>Jaga posisi pinggul</li>        <li>Perhatikan posisi lutut</li>        <li>Gunakan bagian tengah kaki untuk menginjak</li>    </ol>    <h2>Yoga:</h2>    <p>Memulai yoga dengan beberapa langkah:</p>    <ul>        <li>Persiapkan matras</li>        <li>Kenakan pakaian yang nyaman</li>        <li>Buat suasana lebih rileks untuk yoga</li>        <li>Memilih gerakan yoga sesuai kebutuhan. Dapat dilakukan dengan mengikuti instruksi yoga melalui platform            online seperti YouTube maupun kelas offline</li>    </ul>    <h2>Crunch:</h2>    <p>Melakukan crunch dengan beberapa langkah:</p>    <ol>        <li>Posisikan tubuh Anda berbaring terlentang sambil menekuk lutut dan tempatkan telapak kaki menyentuh lantai.        </li>        <li>Tempatkan lengan di dada secara bersila, lalu angkat tubuh hingga perut terasa kencang. Saat mengangkat            tubuh, usahakan agar leher dan bahu tetap rileks.</li>        <li>Setelah itu, tarik napas sambil kembali berbaring dan ulangi gerakan crunch hingga 10–15 kali.</li>    </ol>    <h2>Plank:</h2>    <p>Memperbaiki postur tubuh, meningkatkan kelenturan tubuh, memantapkan keseimbangan tubuh,        mengencangkan perut, meningkatkan kebugaran jasmani dan metabolisme tubuh.</p>    <p>Cara Melakukan Plank dengan Benar:</p>    <ul>        <li>Letakkan siku di atas lantai dan letakan pergelangan tangan di depan, sejajar dengan siku.</li>        <li>Dengan tangan, dorong tubuh ke atas dengan posisi leher lurus. Sementara posisi kaki lurus ke belakang, yang            menempel pada lantai hanyalah ujung jari.</li>        <li>Pastikan badan lurus dengan mengencangkan otot perut. Tahan otot perut agar mengencang. Rasakan juga otot di            area pantat mengencang untuk menahan tubuh tetap lurus.</li>        <li>Tahan gerakan sambil terus bernapas dengan normal.</li>        <li>Tahan posisi tersebut selama 20–60 detik dan ulangi 3–5 kali. Atau sesuai durasi yang mampu dilakukan.</li>    </ul>';
        } else if (bmi >= 25 && bmi < 30) {
            container.innerHTML = '<section id="overweight">    <h1>Overweight</h1>    <p>Overweight atau obesitas derajat I, merupakan kondisi ketika berat badan berlebih dapat disebabkan oleh beberapa        hal, yaitu: penumpukan lemak tubuh, kelebihan otot, tulang, atau gemuk air.</p></section><section id="risks">    <h2>Risiko penyakit</h2>    <ul>        <li>Diabetes tipe 2</li>        <li>Tekanan darah tinggi</li>        <li>Penyakit jantung</li>        <li>Stroke</li>        <li>Sindrom metabolik</li>        <li>Penyakit hati berlemak</li>        <li>Beberapa jenis kanker</li>        <li>Masalah pernapasan</li>        <li>Osteoartritis</li>        <li>Encok</li>        <li>Penyakit kandung empedu dan pankreas</li>        <li>Penyakit ginjal</li>        <li>Masalah kehamilan</li>        <li>Masalah kesuburan</li>        <li>Masalah fungsi seksual</li>        <li>Masalah kesehatan mental</li>    </ul></section><section id="diet-recommendation">    <h2>Rekomendasi Diet</h2>    <p>Diet rendah energi yang seimbang, dengan pengurangan energi 500-1000 kkal dari kebutuhan sehari dengan cara :</p>    <ul>        <li>Mengurangi konsumsi bahan makanan sumber karbohidrat kompleks seperti nasi, roti, jagung, kentang dan sereal        </li>        <li>Menghindari konsumsi bahan makanan sumber karbohidrat sederhana seperti gula pasir, gula merah, sirup, kue            yang manis dan gurih, madu, selai, dodol, coklat, permen, minuman ringan, dll</li>        <li>Mengurangi konsumsi bahan makanan sumber lemak dengan tidak mengolah makanan dengan cara digoreng dan            menggunakan santan kental serta mentega dan margarin</li>        <li>Mengutamakan konsumsi bahan makanan sumber protein rendah lemak, seperti ikan, putih telur, ayam tanpa            kulit, susu dan keju rendah lemak, tempe tahu, dan kacang-kacangan yang diolah</li>    </ul></section><section id="menu">    <h2>Rekomendasi menu makanan</h2>    <ul>        <li>Sayuran dari semua jenis</li>        <li>Buah-buahan, terutama buah utuh daripada jus buah</li>        <li>Biji-bijian, seperti nasi merah, oat, dan roti gandum</li>        <li>Produk susu, termasuk susu bebas lemak atau rendah lemak, yogurt, dan keju, atau produk serupa seperti            minuman kedelai dengan tambahan kalsium, vitamin A, dan vitamin D</li>        <li>Protein dari makanan seperti daging tanpa lemak, unggas, dan telur; makanan laut; buncis, kacang polong, dan            lentil; dan kacang-kacangan, biji-bijian, dan produk kedelai</li>        <li>Minyak tertentu, seperti minyak zaitun dan minyak yang ditemukan dalam makanan laut, kacang-kacangan, dan            alpukat</li>    </ul></section><section id="exercise">    <h2>Exercise</h2>    <p>Kelebihan berat badan terjadi ketika tubuh mengalami ketidakseimbangan energi, yaitu terlalu banyak kalori yang        masuk ke tubuh dan terlalu sedikit kalori yang dibakar. Maka memilih olahraga dan aktivitas yang fokus membakar        kalori tubuh penting dilakukan. Olahraga dan aktivitas yang dapat dilakukan seperti:</p>    <ul>        <li>Berjalan kaki: dapat dilakukan dimana saja dan aktivitas ini efektif untuk membakar kalori.</li>        <li>Sepeda statis: olahraga ini tidak memberikan hasil yang instan dan memang cukup sulit pada awalnya. Namun            semakin rutin melakukannya maka berat badan dapat turun.</li>        <li>Jogging: setelah terbiasa melakukan jalan kaki, Anda dapat menaikkan intensitasnya dengan melakukan jogging.            Jogging dapat membantu untuk membakar lemak visceral yang membahayakan bagi tubuh.</li>        <li>Latihan interval: latihan yang mengacu pada latihan intens yang bergantian dengan periode pemulihan selama            10-30 menit.</li>        <li>Aerobik air: Air membantu menopang berat badan, yang membuat tubuh terasa lebih ringan sehingga membuat            manfaatnya aerobik yang dilakukan menjadi lebih efektif.</li>    </ul></section>';
        } else {
            container.innerHTML = '<section>    <header>        <h1>Obese</h1>    </header>    <p>Obesitas derajat II, diartikan sebagai penumpukan lemak yang tidak normal atau berlebihan, sehingga dapat        menimbulkan risiko berbagai macam penyakit yang mengancam kesehatan. Penyandang obesitas biasanya        disebabkan oleh kelebihan lemak pada tubuh, terutama lemak di perut (viseral).</p>    <h2>Risiko</h2>    <ul>        <li>Penyakit jantung: Obesitas dapat meningkatkan tekanan darah dan membuat kolesterol tinggi sehingga memicu            munculnya penyakit jantung.</li>        <li>Diabetes tipe 2: Obesitas menjadi faktor risiko utama penyakit DM tipe 2, karena dapat menyebabkan            resistensi insulin.</li>        <li>Penyakit ginjal: Obesitas meningkatkan risiko penyakit ginjal dan masalah ginjal lainnya.</li>        <li>Masalah respirasi: Seperti sleep apnea, asma, dan gangguan pernapasan lainnya lebih sering terjadi pada            seseorang yang mengalami obesitas.</li>        <li>Kanker: Obesitas menyebabkan risiko berbagai jenis kanker seperti kanker payudara, kandung kemih, dan            usus.</li>        <li>Gangguan Metabolik: Obesitas dapat menyebabkan gangguan metabolisme, termasuk resistensi insulin dan            sindrom metabolik.</li>        <li>Masalah Kesehatan Mental: Beberapa masalah kesehatan mental, seperti depresi dan kecemasan, dapat            dikaitkan dengan obesitas.</li>        <li>Gangguan Hormonal: Obesitas dapat mempengaruhi keseimbangan hormon, seperti hormon reproduksi, dan            menyebabkan masalah kesuburan.</li>    </ul>    <h2>Rekomendasi Diet</h2>    <p>Diet rendah kalori yang mengandung gizi lengkap dan seimbang. Misalnya dengan menggunakan piring makan model T,        yaitu jumlah sayur 2 kali lipat dari karbohidrat. Dan jumlah makanan sumber protein setara dengan jumlah        makanan sumber karbohidrat. Diharapkan dengan memberikan defisit diet sebanyak 500 kalori dalam diet rendah        kalori ini, akan terjadi penurunan berat badan sebanyak 2—4 kg dalam sebulan.</p>    <h2>Rekomendasi Menu Makanan</h2>    <ul>        <li>Sayur-Mayur (Setengah Piring): Brokoli, wortel, dan sayuran berdaun hijau. (Sayur menjadi bagian utama            untuk memberikan serat, vitamin, dan mineral tanpa banyak kalori.)</li>        <li>Karbohidrat Kompleks (Seperempat Piring): Kentang rebus, beras merah, atau quinoa. (Karbohidrat kompleks            memberikan energi secara bertahap dan kenyang lebih lama.)</li>        <li>Protein (Seperempat Piring): Dada ayam panggang, ikan panggang, atau tofu dan tempe bagi yang vegetarian.            (Protein penting untuk pembentukan otot dan mempertahankan kenyang.)</li>        <li>Lemak Sehat (Secuil Piring atau Sumber Tertentu): Alpukat, kacang-kacangan, atau minyak zaitun. (Lemak            sehat membantu memberikan rasa kenyang dan penting untuk fungsi tubuh.)</li>    </ul>    <p>Penting untuk memperhatikan total asupan kalori dan menjaga porsi makan agar sesuai dengan kebutuhan tubuh.        Selain itu, disarankan untuk konsultasi dengan profesional kesehatan atau ahli gizi untuk perencanaan makan        yang lebih spesifik sesuai kebutuhan individu dan kondisi kesehatan.</p></section><section>    <h2>Exercise</h2>    <p>Obesitas merupakan masalah kesehatan multifaktorial. Tetapi dengan berolahraga dan melakukan aktivitas fisik        yang cukup dapat berpotensi mencegah obesitas. Intervensi aktivitas dan latihan fisik untuk pasien obesitas        akan lebih berhasil jika dikerjakan bersama modifikasi diet dan pengurangan perilaku sedenter. Berbagai studi        merekomendasikan aktivitas fisik intensitas sedang selama 30 menit sebanyak 5 hari/minggu, atau intensitas        berat selama 20 menit sebanyak 3 hari/minggu. Disertai penurunan waktu sedenter paling sedikit 22 menit/hari        pada pasien obesitas. Tiga komponen yang dianjurkan untuk pasien obesitas adalah latihan aerobik (jalan        cepat, sepeda, berenang), latihan beban (baik menggunakan mesin atau beban tubuh), dan latihan fleksibilitas        untuk mengurangi risiko cidera saat melakukan latihan fisik lainnya.</p></section>';
        }
    } catch (error) {
        console.error(error);
    }
}
getBMI();



