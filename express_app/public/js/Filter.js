export const Filter = {
    data() {
        return {
            searchLine: ''
        }
    },
    computed: {
        regular() {
            return new RegExp(this.searchLine, 'i');
        }
    },
    template: `<input type="text" class="search-field" v-model.lazy="searchLine">
              <button class="btn-search" type="submit">
                 <i class="fas fa-search"></i>
              </button>`
};