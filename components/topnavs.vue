<script setup>
// Watch for scroll changes
const isMobileMenuOpen = ref(false);
const toggleMobileMenu = () => {  isMobileMenuOpen.value = !isMobileMenuOpen.value;};
</script>

<template>
    <!-- Top bar -->
    <div class="top-bar">
              <!-- Background dots layers -->
        <div class="dots-pattern"></div>
      <div class="container">
        <div class="contact-info">
          <div class="contact-item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
            <span>+251 914300007</span>
            <span>+251 914705089</span>
            <span>+251 914314811</span>
          </div>
          <div class="contact-item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
            <span>destaalcohol@gmail.com</span>
          </div>
        </div>
        <div class="social-icons">
          <a href="#" aria-label="Instagram">
            <svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a href="#" aria-label="Facebook">
            <svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z" />
            </svg>
          </a>
          <a href="#" aria-label="Twitter">
            <svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
          </a>
          <a href="#" aria-label="TikTok">
            <svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
    <!-- Main navigation -->
    <nav class="main-nav">
      <div class="container">
        <!-- Logo -->
        <div class="logo">
          <NuxtLink to="/" class="logo-link">
            <div class="logo-icon">
              <div class="logo-letter">
                <img src="/assets/pictures/desta-logo.png" alt="">
              </div>
            </div>
            <div class="logo-text">
              <div class="logo-name">Desta</div>
              <div class="logo-tagline">Alcohol & Liquor PLC</div>
            </div>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="nav-links">
            <NuxtLink  to="/" class="nav-link" >Home</NuxtLink>
            <NuxtLink  to="/aboutUs"  class="nav-link" >About Us</NuxtLink>
            <NuxtLink  to="/contactUs" class="nav-link" >Contact</NuxtLink>
            <NuxtLink  to="/sellingPrice" class="nav-link" >Selling Price</NuxtLink>
            <NuxtLink  to="/order" class="nav-link" >Order</NuxtLink>
            <NuxtLink  to="/blog" class="nav-link" >Blog</NuxtLink>
            <NuxtLink  to="/community" class="nav-link" >Community</NuxtLink>
            <NuxtLink  to="/vacancy" class="nav-link" >Career</NuxtLink>
        </div>

        <!-- Right Icons -->
        <div class="nav-actions">
          <!-- Mobile menu button -->
          <button  class="menu-toggle" @click="toggleMobileMenu" aria-label="Toggle menu">
            <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path  stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

        <!-- Mobile menu -->
        <transition name="slide-down">
            <div v-if="isMobileMenuOpen" class="mobile-menu">
                <div class="container">
                    <a  @click=" $router.push('/').then( ()=>isMobileMenuOpen = false)" class="mobile-nav-link">Home</a>
                    <a  @click=" $router.push('/aboutUs').then( ()=>isMobileMenuOpen = false)" class="mobile-nav-link" >About Us</a>
                    <a  @click=" $router.push('/contactUs').then( ()=>isMobileMenuOpen = false)" class="mobile-nav-link" >Contact</a>
                    <a  @click=" $router.push('/sellingPrice').then( ()=>isMobileMenuOpen = false)" class="mobile-nav-link" >Selling Price</a>
                    <a  @click=" $router.push('/order').then( ()=>isMobileMenuOpen = false)" class="mobile-nav-link" >Order</a>
                    <a  @click=" $router.push('/blog').then( ()=>isMobileMenuOpen = false)" class="mobile-nav-link" >Blog</a>
                    <a  @click=" $router.push('/community').then( ()=>isMobileMenuOpen = false)" class="mobile-nav-link" >Community</a>
                    <a  @click=" $router.push('/vacancy').then( ()=>isMobileMenuOpen = false)" class="mobile-nav-link" >Career</a>
                </div>
            </div>
        </transition>

    </nav>
</template>
<style scoped lang="scss">
@use '/assets/style/nav/index.scss' as *;
</style>