"use strict";

$('.page-demo__list a').on('click', function (e) {
  e.preventDefault();
  var href = $(this).attr('href');
  $('.page-demo iframe').attr('src', href);
});
function headerHide() {
  var header = document.querySelector(".header");
  var headerScroll = document.querySelector(".header-scroll");
  var scrollPrev = 0;
  window.addEventListener('scroll', function () {
    var scrolled = scrollY;
    if (scrolled > 700) {
      header.classList.add('header-scroll');
    } else {
      header.classList.remove('header-scroll');
    }
    if (scrolled > 700 && scrolled < scrollPrev) {
      header.classList.add('header-top');
    } else {
      header.classList.remove('header-top');
    }
    scrollPrev = scrolled;
  });
}
if (window.innerWidth > 991) {
  headerHide();
}
"use strict";

function DynamicAdapt(type) {
  this.type = type;
}
DynamicAdapt.prototype.init = function () {
  var _this2 = this;
  var _this = this;
  // массив объектов
  this.оbjects = [];
  this.daClassname = "_dynamic_adapt_";
  // массив DOM-элементов
  this.nodes = document.querySelectorAll("[data-da]");

  // наполнение оbjects объктами
  for (var i = 0; i < this.nodes.length; i++) {
    var node = this.nodes[i];
    var data = node.dataset.da.trim();
    var dataArray = data.split(",");
    var оbject = {};
    оbject.element = node;
    оbject.parent = node.parentNode;
    оbject.destination = document.querySelector(dataArray[0].trim());
    оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
    оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
    оbject.index = this.indexInParent(оbject.parent, оbject.element);
    this.оbjects.push(оbject);
  }
  this.arraySort(this.оbjects);

  // массив уникальных медиа-запросов
  this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
    return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
  }, this);
  this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
    return Array.prototype.indexOf.call(self, item) === index;
  });

  // навешивание слушателя на медиа-запрос
  // и вызов обработчика при первом запуске
  var _loop = function _loop() {
    var media = _this2.mediaQueries[_i];
    var mediaSplit = String.prototype.split.call(media, ',');
    var matchMedia = window.matchMedia(mediaSplit[0]);
    var mediaBreakpoint = mediaSplit[1];

    // массив объектов с подходящим брейкпоинтом
    var оbjectsFilter = Array.prototype.filter.call(_this2.оbjects, function (item) {
      return item.breakpoint === mediaBreakpoint;
    });
    matchMedia.addListener(function () {
      _this.mediaHandler(matchMedia, оbjectsFilter);
    });
    _this2.mediaHandler(matchMedia, оbjectsFilter);
  };
  for (var _i = 0; _i < this.mediaQueries.length; _i++) {
    _loop();
  }
};
DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
  if (matchMedia.matches) {
    for (var i = 0; i < оbjects.length; i++) {
      var оbject = оbjects[i];
      оbject.index = this.indexInParent(оbject.parent, оbject.element);
      this.moveTo(оbject.place, оbject.element, оbject.destination);
    }
  } else {
    for (var _i2 = 0; _i2 < оbjects.length; _i2++) {
      var _оbject = оbjects[_i2];
      if (_оbject.element.classList.contains(this.daClassname)) {
        this.moveBack(_оbject.parent, _оbject.element, _оbject.index);
      }
    }
  }
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
  element.classList.add(this.daClassname);
  if (place === 'last' || place >= destination.children.length) {
    destination.insertAdjacentElement('beforeend', element);
    return;
  }
  if (place === 'first') {
    destination.insertAdjacentElement('afterbegin', element);
    return;
  }
  destination.children[place].insertAdjacentElement('beforebegin', element);
};

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
  element.classList.remove(this.daClassname);
  if (parent.children[index] !== undefined) {
    parent.children[index].insertAdjacentElement('beforebegin', element);
  } else {
    parent.insertAdjacentElement('beforeend', element);
  }
};

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
  var array = Array.prototype.slice.call(parent.children);
  return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
  if (this.type === "min") {
    Array.prototype.sort.call(arr, function (a, b) {
      if (a.breakpoint === b.breakpoint) {
        if (a.place === b.place) {
          return 0;
        }
        if (a.place === "first" || b.place === "last") {
          return -1;
        }
        if (a.place === "last" || b.place === "first") {
          return 1;
        }
        return a.place - b.place;
      }
      return a.breakpoint - b.breakpoint;
    });
  } else {
    Array.prototype.sort.call(arr, function (a, b) {
      if (a.breakpoint === b.breakpoint) {
        if (a.place === b.place) {
          return 0;
        }
        if (a.place === "first" || b.place === "last") {
          return 1;
        }
        if (a.place === "last" || b.place === "first") {
          return -1;
        }
        return b.place - a.place;
      }
      return b.breakpoint - a.breakpoint;
    });
    return;
  }
};
var da = new DynamicAdapt("max");
da.init();
"use strict";

function menu() {
  var burger = document.querySelector('.burger');
  var menu = document.querySelector('.nav');
  burger.addEventListener('click', function () {
    this.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.classList.toggle('scroll-hide');
  });
}
menu();
"use strict";

var header = document.querySelector('.header'),
  modaWrap = document.querySelectorAll('.modal-wrap'),
  scrollHide = calcScroll();
function bindModal(triggerSelector, modalSelector) {
  var trigger = document.querySelectorAll(triggerSelector);
  var modal = document.querySelector(modalSelector);
  trigger.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      closeModal();
      hideScroll();
      modal.classList.add('active');
    });
  });
}
function calcScroll() {
  var div = document.createElement('div');
  div.style.width = '50px';
  div.style.height = '50px';
  div.style.overflowY = 'scroll';
  div.style.visibility = 'hidden';
  document.body.appendChild(div);
  var scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();
  return scrollWidth;
}
function hideScroll() {
  document.body.style.overflow = "hidden";
  document.body.style.marginRight = "".concat(scrollHide, "px");
}
function showScroll() {
  document.body.style.overflow = "";
  document.body.style.marginRight = '';
}
function showModal(modalItem) {
  var modal = document.querySelector(modalItem);
  closeModal();
  modal.classList.add('active');
}
function closeModal() {
  var modalAll = document.querySelectorAll('.modal-wrap');
  modalAll.forEach(function (item) {
    item.classList.remove('active');
    showScroll();
  });
}
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});
function closeAllModal() {
  var modalAll = document.querySelectorAll('.modal-wrap');
  var modalClose = document.querySelectorAll('.modal__close, .close-modal');
  modalClose.forEach(function (item) {
    item.addEventListener('click', function () {
      closeModal();
    });
  });
  modalAll.forEach(function (item) {
    item.addEventListener('click', function (e) {
      if (e.target === item) {
        item.classList.remove('active');
        showScroll();
      }
    });
  });
}
closeAllModal();

/////////////////////////////////////////////////////////////////////////

bindModal('.trigger', '.modal');

//showModal('.modal');
"use strict";

var swiper = new Swiper(".recommend-swiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  speed: 1000,
  pagination: {
    el: ".recommend .swiper-pagination",
    clickable: true
  },
  navigation: {
    nextEl: ".recommend .swiper-button-next",
    prevEl: ".recommend .swiper-button-prev"
  },
  breakpoints: {
    991: {
      slidesPerView: 3
    },
    300: {
      slidesPerView: 1,
      spaceBetween: 10
    }
  }
});
"use strict";

//Default pop-up | pop-up for video
$(document).ready(function () {
  $(".modal-video-wrap").css("display", "block");
  $(".modal-content").click(function (e) {
    return e.stopPropagation();
  });
  $(".modal-video-wrap").click(function (e) {
    hideModal($(this));
    $(".video-modal .modal-video").html('<div id="modal-video-iframe"></div>');
  });
  $(".modal-close, .js-modal-close").click(function (e) {
    e.preventDefault();
    hideModal($(this).closest(".modal-video-wrap"));
    $(".video-modal .modal-video").html('<div id="modal-video-iframe"></div>');
  });
  $("[data-modal]").click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    hideModal(".modal-video-wrap");
    if ($(this).data("modal-tab") != undefined) {
      goToTab($(this).data("modal-tab"));
    }
    showModal($(this).data("modal-video-wrap"));
  });
  $("[data-video-modal]").click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    var videoId = $(this).data("video-modal");
    var videoType = $(this).data("video-type");
    if (videoType == "youtube") {
      $("#modal-video-iframe").removeClass("vimeo youtube").addClass("youtube").append('<div class="video-iframe" id="' + videoId + '"></div>');
      createVideo(videoId, videoId);
    } else if (videoType == "vimeo") {
      $("#modal-video-iframe").removeClass("vimeo youtube").addClass("vimeo").html('<iframe class="video-iframe" allow="autoplay" src="https://player.vimeo.com/video/' + videoId + '?playsinline=1&autoplay=1&transparent=1&app_id=122963">');
    } else if (videoType == "mp4" || videoType == "drive") {
      $("#modal-video-iframe").removeClass("vimeo youtube").addClass("video").html("\n                      <video controls autoplay playisline>\n                          <source src=\"".concat(videoId, "\">\n                      </video>   \n                  "));
    }
    hideModal(".modal-video-wrap");
    showModal("#video-modal");
  });
  var player;
  function createVideo(videoBlockId, videoId) {
    player = new YT.Player(videoBlockId, {
      videoId: videoId,
      playerVars: {
        autohide: 1,
        showinfo: 0,
        rel: 0,
        loop: 1,
        playsinline: 1,
        fs: 1,
        allowsInlineMediaPlayback: true
      },
      events: {
        onReady: function onReady(e) {
          // e.target.mute();
          // if ($(window).width() > 991) {
          setTimeout(function () {
            e.target.playVideo();
          }, 200);
          // }
        }
      }
    });
  }
});

function getScrollWidth() {
  // create element with scroll
  var div = document.createElement("div");
  div.style.overflowY = "scroll";
  div.style.width = "0px";
  div.style.height = "0px";
  document.body.append(div);
  var scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();
  return scrollWidth;
}
var bodyScrolled = 0;
function showModal(modal) {
  $(modal).addClass("visible");
  bodyScrolled = $(window).scrollTop();
  $("body").addClass("active").scrollTop(bodyScrolled).css("padding-right", getScrollWidth());
}
function hideModal(modal) {
  $(modal).removeClass("visible");
  bodyScrolled = $(window).scrollTop();
  $("body").removeClass("active").scrollTop(bodyScrolled).css("padding-right", 0);
}
"use strict";
//# sourceMappingURL=main.js.map
