import Navigo from "navigo";

const library = document.querySelector('.library');
const book = document.querySelector('.book');
const add = document.querySelector('.add');
const addBtns = document.querySelectorAll('.header__btn-add, .library__add-btn');
const  backBtn = document.querySelectorAll('.header__btn_back');
const btnSearch = document.querySelectorAll('.header__btn_search');
const search = document.querySelector('.search');

const router = new Navigo("/", {hash: true,});

// создаем обработчики, которые будут запускаться в зависимости от адресной строки

const closeAllPage = () => {
  library.classList.add('hidden');
  book.classList.add('hidden');
  add.classList.add('hidden');
}

router.on({
  '/': () => {
    closeAllPage();
      library.classList.remove("hidden");
  },
  'book': () => {
    closeAllPage();
      book.classList.remove("hidden");
  },
  'add' : () => {
    closeAllPage();
      add.classList.remove("hidden");
  }
}).resolve();

addBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    router.navigate('add');
  })
});


backBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    router.navigate('/');
  })
});
// с помощью деструктуризации достаем из евента объект тргет
const closeSearch = ({target}) => {
  // tckb в таргете будет класс search, то ретурн,
  // если нет- закрываем всплывающее окно?  удаляя класс search_active

  if (target.closest('.search, .header__btn_search')) {
    return;
  }
  search.classList.remove('search_active');
  document.body.removeEventListener('click', closeSearch);
};


btnSearch.forEach(btn => {
  btn.addEventListener('click', () => {
    search.classList.add('search_active');
    document.body.addEventListener('click', closeSearch);
  });
});