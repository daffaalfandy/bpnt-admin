<template>
  <div class="container-fluid">
    <div class="card mt-4 shadow text-center">
      <h5 class="card-header h3 text-center">Input Data KPM</h5>
      <div class="card-body">
        <div class="text-center h4 mt-1 mb-5">Masukkan Data KPM</div>
        <!-- <form class="form-inline">
          <div class="row ml-5">
            <div class="col-10 mx-auto text-center">
              <div class="form-group">
                <label>Nomor KKS: </label>
                <input
                  disabled
                  type="text"
                  id="kks-number-1"
                  name="kks-number-1"
                  maxlength="4"
                  class="form-control mx-3"
                  style="width: 15%"
                />

                <input
                  disabled
                  type="text"
                  id="kks-number-2"
                  name="kks-number-2"
                  maxlength="4"
                  class="form-control mr-3"
                  style="width: 15%"
                />
                <input
                  type="text"
                  id="kks-number-3"
                  name="kks-number-3"
                  maxlength="4"
                  class="form-control mr-3"
                  style="width: 15%"
                  disabled
                />
                <input
                  type="text"
                  id="kks-number-4"
                  name="kks-number-4"
                  maxlength="4"
                  class="form-control mr-3"
                  style="width: 15%"
                  disabled
                />
              </div>
              <div class="form-group mt-4">
                <label for="name">Nama KPM: </label>
                <input
                  type="text"
                  class="form-control ml-4"
                  placeholder="Nama KPM"
                  style="width: 70%"
                />
              </div>
              <div class="form-group mt-4">
                <label for="">Alamat</label>
              </div>
              <div class="form-group mt-4">
                <label for="dusun">Dusun: </label>
                <input
                  type="text"
                  class="form-control ml-4"
                  placeholder="Dusun"
                />
              </div>
            </div>
          </div>
        </form> -->
        <form class="container">
          <div class="row ml-5">
            <div class="form-group form-inline ml-3">
              <label>Nomor KKS: </label>
              <input
                disabled
                type="text"
                id="kks-number-1"
                name="kks-number-1"
                maxlength="4"
                class="form-control mx-3"
                style="width: 15%"
              />

              <input
                disabled
                type="text"
                id="kks-number-2"
                name="kks-number-2"
                maxlength="4"
                class="form-control mr-3"
                style="width: 15%"
              />
              <input
                type="text"
                id="kks-number-3"
                name="kks-number-3"
                maxlength="4"
                class="form-control mr-3"
                style="width: 15%"
                disabled
              />
              <input
                type="text"
                id="kks-number-4"
                name="kks-number-4"
                maxlength="4"
                class="form-control mr-3"
                style="width: 15%"
                disabled
              />
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-3 my-auto text-right">
              <label for="name">Nama KPM: </label>
            </div>
            <div class="col-9">
              <input
                type="text"
                class="form-control"
                placeholder="Masukkan nama KPM"
                id="name"
              />
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-3 my-auto text-right">
              <label for="">Alamat</label>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-3 my-auto text-right">
              <label for="dusun">Dusun: </label>
            </div>
            <div class="col-5">
              <input
                type="text"
                class="form-control"
                placeholder="Masukkan dusun KPM"
                id="dusun"
              />
            </div>
            <div class="col-2 my-auto text-right">
              <label for="rt">RT:</label>
            </div>
            <div class="col-2">
              <input
                type="text"
                class="form-control"
                placeholder="RT"
                id="rt"
              />
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-3 my-auto text-right">
              <label for="desa">Desa: </label>
            </div>
            <div class="col-9">
              <input
                type="text"
                class="form-control"
                placeholder="Masukkan desa KPM"
                id="desa"
              />
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-3 my-auto text-right">
              <label for="kecamatan">Kecamatan: </label>
            </div>
            <div class="col-9">
              <input
                type="text"
                class="form-control"
                placeholder="Masukkan kecamatan KPM"
                id="kecamatan"
              />
            </div>
          </div>
          <button class="btn btn-primary mt-5 px-4 float-right">Mulai</button>
        </form>
      </div>
    </div>
  </div>
</template>
