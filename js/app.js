async function fetchData(url) {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

async function populateSelect(elementId, apiUrl) {
    const selectElement = document.getElementById(elementId);
    const data = await fetchData(apiUrl);

    // Bersihkan opsi-opsi sebelum menambahkan yang baru
    selectElement.innerHTML = "<option value=''>Pilih</option>";

    data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.id;  // Menggunakan Nama sebagai nilai
        option.text = item.name;   // Menggunakan Nama sebagai teks

        selectElement.appendChild(option);
    });
}


async function populateRegencies() {
    const provinceName = document.getElementById("provinceId").value;
    if (provinceName) {
        await populateSelect("regencyId", `api/regencies/${provinceName}.json`);
    }
}

async function populateDistricts() {
    const regencyName = document.getElementById("regencyId").value;

    if (regencyName) {
        await populateSelect("districtId", `api/districts/${regencyName}.json`);
    }
}

async function populateVillages() {
    const districtName = document.getElementById("districtId").value;
    if (districtName) {
        return await populateSelect("villageId", `api/villages/${districtName}.json`);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    populateSelect("provinceId", "api/provinces.json");

    document.getElementById("provinceId").addEventListener("change", () => {
        document.getElementById("regencyId").innerHTML = "<option value=''>Pilih</option>";
        document.getElementById("districtId").innerHTML = "<option value=''>Pilih</option>";
        document.getElementById("villageId").innerHTML = "<option value=''>Pilih</option>";
        populateRegencies();
    });

    document.getElementById("regencyId").addEventListener("change", () => {
        document.getElementById("districtId").innerHTML = "<option value=''>Pilih</option>";
        document.getElementById("villageId").innerHTML = "<option value=''>Pilih</option>";
        populateDistricts();
    });

    document.getElementById("districtId").addEventListener("change", async () => {
        document.getElementById("villageId").innerHTML = "<option value=''>Pilih</option>";
        await populateVillages();

    });
});
