<template>
  <div id="app" class="wrapper">
    <!-- Navbar -->
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" data-widget="pushmenu" href="#" role="button">
            <i class="fas fa-bars"></i>
          </a>
        </li>
      </ul>
    </nav>
    <!-- /.navbar -->

    <!-- Main Sidebar Container -->
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <!-- Brand Logo -->
      <a href="/" class="brand-link">
        <img
          src="./assets/images/icon.png"
          alt="AdminLTE Logo"
          class="brand-image img-circle elevation-3"
          style="opacity: 0.8"
        />
        <span class="brand-text font-weight-light">BPNT Helper</span>
      </a>

      <!-- Sidebar -->
      <div class="sidebar">
        <!-- Sidebar user panel (optional) -->
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
          <div class="image">
            <img
              src="./assets/images/admin-icon.png"
              class="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div class="info">
            <a href="#" class="d-block">{{ admin.name }}</a>
          </div>
        </div>

        <!-- Sidebar Menu -->
        <nav class="mt-2">
          <ul
            class="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li class="nav-item">
              <router-link
                tag="a"
                active-class="active"
                exact
                to="/"
                class="nav-link"
              >
                <i class="nav-icon fas fa-cash-register mr-2"></i>
                <p>Transaksi Penjualan</p>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                tag="a"
                active-class="active"
                exact
                to="/purchase"
                class="nav-link"
              >
                <i class="fas fa-shopping-cart mr-2 nav-icon"></i>
                <p>Transaksi Pembelian</p>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                tag="a"
                active-class="active"
                exact
                to="/goods"
                class="nav-link"
              >
                <i class="nav-icon fas fa-th mr-2"></i>
                <p>Persediaan Barang</p>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                tag="a"
                active-class="active"
                exact
                to="/kpm"
                class="nav-link"
              >
                <i class="nav-icon fas fa-user-friends mr-2"></i>
                <p>Data KPM</p>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                tag="a"
                active-class="active"
                exact
                to="/transaction-history"
                class="nav-link"
              >
                <i class="nav-icon fas fa-history mr-2"></i>
                <p>Riwayat Transaksi</p>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                tag="a"
                active-class="active"
                exact
                to="/final-report"
                class="nav-link"
              >
                <i class="nav-icon fas fa-receipt mr-2"></i>
                <p>Laporan Akhir</p>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                tag="a"
                active-class="active"
                exact
                to="/income-statement"
                class="nav-link"
              >
                <i class="nav-icon fas fa-coins mr-2"></i>
                <p>Laba Rugi</p>
              </router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link btn text-left" @click.prevent="onClickLogout">
                <i class="nav-icon fas fa-sign-out-alt mr-2"></i>
                <p>Keluar</p>
              </a>
            </li>
          </ul>
        </nav>
        <!-- /.sidebar-menu -->
      </div>
      <!-- /.sidebar -->
    </aside>

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
      <!-- Main content -->
      <div class="content">
        <div class="container-fluid">
          <router-view></router-view>
        </div>
        <!-- /.container-fluid -->
      </div>
      <!-- /.content -->
    </div>
    <footer
      class="text-right shadow pr-3 pb-2 pt-2 custom-footer"
      style="font-size: 0.9em"
    >
      &#169; 2020, Daffa Alfandy. All rights reserved.
      <a
        href="https://www.linkedin.com/in/daffa-alfandy-818187199/"
        class="mx-2"
        target="_blank"
        style="color: #343a40"
      >
        <i class="fab fa-linkedin"></i>
      </a>
      <a
        href="https://github.com/daffaalfandy"
        style="color: #343a40"
        target="_blank"
        class="mx-2"
      >
        <i class="fab fa-github"></i>
      </a>
    </footer>
    <!-- /.content-wrapper -->
  </div>
</template>

<script>
/*global Swal*/
/*eslint no-undef: "error"*/
import { mapGetters } from "vuex"; //eslint-disable-line no-undef

export default {
  methods: {
    onClickLogout() {
      Swal.fire({
        title: "Logout?",
        text: "Apakah anda ingin mengakhiri sesi ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$router.replace({ path: "/logout" });
        }
      });
    },
  },
  computed: mapGetters(["admin"]),
};
</script>
