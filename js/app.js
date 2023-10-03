// provinsi
const provinceName = document.getElementById("provinceId");
// kabupaten
const regencyName = document.getElementById("regencyId");
// kecamatan
const districtName = document.getElementById("districtId");
// desa
const village = document.getElementById("villageId");

// Data yang dikirimkan
const provinsiAsli = document.getElementById("provinsiAsli");
const realRegency = document.getElementById("realRegency");
const realDistrict = document.getElementById("realDistrict");
const realVillage = document.getElementById("realVillage");

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function populateSelect(elementId, apiUrl) {
  const selectElement = document.getElementById(elementId);
  const data = await fetchData(apiUrl);

  // Bersihkan opsi-opsi sebelum menambahkan yang baru
  selectElement.innerHTML = "<option value=''>Pilih</option>";

  data.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.id; // Menggunakan Nama sebagai nilai
    option.setAttribute("data-name", item.name);
    option.text = item.name; // Menggunakan Nama sebagai teks

    selectElement.appendChild(option);
  });

  provinceName.addEventListener("change", function () {
    provinsiAsli.value =
      this.options[this.selectedIndex].getAttribute("data-name");
  });

  regencyName.addEventListener("change", function () {
    realRegency.value =
      this.options[this.selectedIndex].getAttribute("data-name");
  });

  districtName.addEventListener("change", function () {
    realDistrict.value =
      this.options[this.selectedIndex].getAttribute("data-name");
  });

  village.addEventListener("change", function () {
    realVillage.value =
      this.options[this.selectedIndex].getAttribute("data-name");
  });
}

async function populateRegencies() {
  if (provinceName) {
    await populateSelect(
      "regencyId",
      `api/regencies/${provinceName.value}.json`
    );
  }
}

async function populateDistricts() {
  if (regencyName) {
    await populateSelect(
      "districtId",
      `api/districts/${regencyName.value}.json`
    );
  }
}

async function populateVillages() {
  if (districtName) {
    return await populateSelect(
      "villageId",
      `api/villages/${districtName.value}.json`
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  populateSelect("provinceId", "api/provinces.json");

  document.getElementById("provinceId").addEventListener("change", () => {
    document.getElementById("regencyId").innerHTML =
      "<option value=''>Pilih</option>";
    document.getElementById("districtId").innerHTML =
      "<option value=''>Pilih</option>";
    document.getElementById("villageId").innerHTML =
      "<option value=''>Pilih</option>";
    populateRegencies();
  });

  document.getElementById("regencyId").addEventListener("change", () => {
    document.getElementById("districtId").innerHTML =
      "<option value=''>Pilih</option>";
    document.getElementById("villageId").innerHTML =
      "<option value=''>Pilih</option>";
    populateDistricts();
  });

  document.getElementById("districtId").addEventListener("change", async () => {
    document.getElementById("villageId").innerHTML =
      "<option value=''>Pilih</option>";
    await populateVillages();
  });
});
