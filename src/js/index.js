import Navigo from "navigo";

const library = document.querySelector('.library');
const book = document.querySelector('.book');
const add = document.querySelector('.add');
const addBtns = document.querySelectorAll('.header__btn-add, .library__add-btn');
const  backBtn = document.querySelectorAll('.header__btn_back');
const btnSearch = document.querySelectorAll('.header__btn_search');
const search = document.querySelector('.search');
const fieldsBtnSort  = document.querySelector('.fields__btn_sort');
const fieldsListSort = document.querySelector('.fields__list_sort');
const fieldsBtnFilter = document.querySelector('.fields__btn_filter');
const fieldsListFilter = document.querySelector('.fields__list_filter');


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
      document.body.classList.remove('body_gradient');
  },
  'book': () => {
    closeAllPage();
      book.classList.remove("hidden");
      document.body.classList.add('body_gradient');
  },
  'add' : () => {
    closeAllPage();
      add.classList.remove("hidden");
      document.body.classList.add('body_gradient');
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
    // true тут меняет цепочку обращения ( порядок), что бы события срабатывали извне, а не внутрь
    // при нажатии происходит не одно событие, а несколько, начиная с бади и до самого последнего( к примеру)
    // budy, div, div, image. вот поиск это последняя в этом списке и что бы перекрыть другие срабатывания прописываю true
    document.body.addEventListener('click', closeSearch, true);
  });
});



// offlist для того, что бы не было открыто сразу оба поля - по рейтингу и фильтр
const controlField = (btn, list, offlist) => {
// при нажатии добавляем(или удаляем) класс. список по рейтингу всплывает или пропадает
btn.addEventListener('click', () => {
  list.classList.toggle('fields__list_active');
  offlist.classList.remove('fields__list_active');
});

list.addEventListener('click', ({target}) => {
// если собержит класс fields__button
  if (target.classList.contains('fields__button')){
    list.classList.remove('fields__list_active')

  }
});

};

controlField(fieldsBtnSort, fieldsListSort, fieldsListFilter);
controlField(fieldsBtnFilter, fieldsListFilter, fieldsListSort);