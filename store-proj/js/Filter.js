export const Filter = {
    data() {
        return {
            searchLine: ''
        }
    },
    computed: {
        filteredArr() {
            const regexp = new RegExp(this.searchLine, 'i');
            //console.log(this.$root.$refs.catalog.products.filter(product => regexp.test(product.product_name)))
            return this.$root.$refs.catalog.products.filter(product => regexp.test(product.product_name));
        }
    },
    template: `<input type="text" class="search-field" v-model.lazy="searchLine">
              <button class="btn-search" type="submit">
                 <i class="fas fa-search"></i>
              </button>`
};