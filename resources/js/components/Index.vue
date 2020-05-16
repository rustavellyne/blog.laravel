<template>
    <div>
        <nav class="navbar navbar-light bg-white border-bottom">
            <router-link :to="{ name: 'home'}" class="navbar-brand mr-auto">Home</router-link>
            <router-link :to="{ name: 'contacts'}" class="btn ">Contacts</router-link>
        </nav>
        <div class="container mt-4 mb-4 pl-4 pr-4">
            <router-view></router-view>
        </div>
        
    </div>
</template>