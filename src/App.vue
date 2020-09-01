<template>
  <div id="app" class="wrapper">
    <!-- Navbar -->
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" data-widget="pushmenu" href="#" role="button"
            ><i class="fas fa-bars"></i
          ></a>
        </li>
      </ul>
    </nav>
    <!-- /.navbar -->

    <!-- Main Sidebar Container -->
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <!-- Brand Logo -->
      <a href="index3.html" class="brand-link">
        <img
          src="./assets/images/icon.png"
          alt="AdminLTE Logo"
          class="brand-image img-circle elevation-3"
          style="opacity: .8"
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
            <a href="#" class="d-block">Alexander Pierce</a>
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
                <p>
                  Transaksi
                </p>
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
                <p>
                  Data Barang
                </p>
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
                <p>
                  Data KPM
                </p>
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
                <p>
                  Riwayat Transaksi
                </p>
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
                <p>
                  Laporan Akhir
                </p>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                tag="a"
                active-class="active"
                exact
                to="/profit-report"
                class="nav-link"
              >
                <i class="nav-icon fas fa-coins mr-2"></i>
                <p>
                  Laba Rugi
                </p>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                tag="a"
                active-class="active"
                exact
                to="/logout"
                class="nav-link"
              >
                <i class="nav-icon fas fa-sign-out-alt mr-2"></i>
                <p>
                  Keluar
                </p>
              </router-link>
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
          <!-- <vue-progress-bar></vue-progress-bar> -->
        </div>
        <!-- /.container-fluid -->
      </div>
      <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->
  </div>
</template>
