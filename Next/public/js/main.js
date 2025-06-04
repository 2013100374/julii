(function ($) {
  "use strict";
  $(document).ready(function () {

    // ========================== Small Device Header Menu On Click Dropdown menu collapse Stop Js Start =====================
    $('.dropdown-item').on('click', function () {
      $(this).closest('.dropdown-menu').addClass('d-block')
    });
    // ========================== Small Device Header Menu On Click Dropdown menu collapse Stop Js End =====================

    // ========================== Add Attribute For Bg Image Js Start =====================
    $(".bg-img").css('background', function () {
      var bg = ('url(' + $(this).data("background-image") + ')');
      return bg;
    });
    // ========================== Add Attribute For Bg Image Js End =====================

    // ================== Password Show Hide Js Start ==========
    $(".toggle-password").on('click', function () {
      $(this).toggleClass(" fa-eye-slash");
      var input = $($(this).attr("id"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
    });
    // =============== Password Show Hide Js End =================

    // ========================= Slick Slider Js Start ==============
    $(function (e) {
      $('.instructor-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 1500,
        dots: false,
        pauseOnHover: true,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
        appendArrows: e(".instructor-slider__arrow"),
        responsive: [{
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
            }
          },
          {
            breakpoint: 991,
            settings: {
              arrows: false,
              slidesToShow: 2,
              dots: true
            }
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
              arrows: false,
              dots: true
            }
          }
        ]
      });
    })

    $(function () {
      $('.client-testimonial__wrapper').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        speed: 1500,
        dots: false,
        pauseOnHover: true,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',

        responsive: [{
          breakpoint: 1200,
          settings: {
            arrows: false,
            slidesToShow: 1,
            dots: true
          }
        }]
      });
    })

    // ========================= Slick Slider Js Start ==============
    $(function (e) {
      $('.dashboard-course-slider').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 1500,
        dots: false,
        pauseOnHover: true,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
        appendArrows: e(".instructor-slider__arrow"),
        responsive: [{
            breakpoint: 1200,
            settings: {
              slidesToShow: 2,
            }
          },
          {
            breakpoint: 991,
            settings: {
              arrows: false,
              slidesToShow: 2,
              dots: true
            }
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
              arrows: false,
              dots: true
            }
          }
        ]
      });
    })

    $(document).ready(function () {
      var $slider = $('.top-courses__slider');
      var $progressBar = $('.slider-progress');

      // $slider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
      //   var slidesToShow = slick.options.slidesToShow;

      //   if (slick.breakpointSettings) {
      //     $.each(slick.breakpointSettings, function (breakpoint, settings) {
      //       if ($(window).width() < breakpoint) {
      //         slidesToShow = settings.slidesToShow || slidesToShow;
      //       }
      //     });
      //   }
      //   var calc = (nextSlide / (slick.slideCount - slidesToShow)) * 100;
      //   $progressBar
      //     .css('background-size', calc + '% 100%')
      //     .attr('aria-valuenow', calc);
      // });

      $(function (e) {
        $slider.slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: false,
          autoplaySpeed: 2000,
          speed: 1500,
          dots: false,
          pauseOnHover: true,
          arrows: true,
          infinite: false,
          prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
          nextArrow: '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
          appendArrows: e(".top-courses__arrow"),
          responsive: [{
              breakpoint: 1200,
              settings: {
                arrows: true,
                slidesToShow: 3,
              }
            },
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 576,
              settings: {
                slidesToShow: 1
              }
            }
          ]
        });
      });

      // Update progress bar on slide change
      $slider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
        var slidesToShow = slick.options.slidesToShow;
        var calc = ((nextSlide + slidesToShow) / slick.slideCount) * 100;
        $progressBar
          .css('background-size', calc + '% 100%')
          .attr('aria-valuenow', calc);
      });
    });


    $(document).ready(function () {
      var $slider = $('.short-courses__slider');
      var $progressBar = $('.short-slider-progress');

      $(function (e) {
        $slider.slick({
          slidesToShow: 4,
          autoplay: false,
          autoplaySpeed: 2000,
          swipeToSlide: true,
          speed: 1500,
          dots: false,
          pauseOnHover: true,
          arrows: true,
          infinite: false,
          prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
          nextArrow: '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
          appendArrows: e(".short-courses__arrow"),
          responsive: [{
              breakpoint: 1200,
              settings: {
                arrows: true,
                slidesToShow: 3,
              }
            },
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 2
              }
            },
            {
              breakpoint: 576,
              settings: {
                slidesToShow: 1
              }
            }
          ]
        });
      });

      // Update progress bar on slide change
      $slider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
        var slidesToShow = slick.options.slidesToShow;
        var calc = ((nextSlide + slidesToShow) / slick.slideCount) * 100;
        $progressBar
          .css('background-size', calc + '% 100%')
          .attr('aria-valuenow', calc);
      });
    });

    $(document).ready(function () {
      var $slider = $('.blog-slider');
      var $progressBar = $('.blog-slider-progress');

      // Initialize Slick Slider
      $slider.slick({
        slidesToShow: 4,
        autoplay: false,
        autoplaySpeed: 2000,
        swipeToSlide: true,
        speed: 1500,
        dots: false,
        pauseOnHover: true,
        arrows: true,
        infinite: false,
        prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-arrow-left"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fas fa-arrow-right"></i></button>',
        appendArrows: $(".blog-courses__arrow"),
        responsive: [{
            breakpoint: 1200,
            settings: {
              arrows: true,
              slidesToShow: 3,
            }
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
            }
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 1,
            }
          }
        ]
      });

      // Update progress bar on slide change
      $slider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
        var slidesToShow = slick.options.slidesToShow;
        var calc = ((nextSlide + slidesToShow) / slick.slideCount) * 100;
        $progressBar
          .css('background-size', calc + '% 100%')
          .attr('aria-valuenow', calc);
      });
    });
    // ========================= Slick Slider Js End ===================

    // ========================= Client Slider Js Start ===============
    $('.client-slider').slick({
      slidesToShow: 6,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1000,
      pauseOnHover: true,
      speed: 2000,
      dots: false,
      arrows: false,
      prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-long-arrow-alt-left"></i></button>',
      nextArrow: '<button type="button" class="slick-next"><i class="fas fa-long-arrow-alt-right"></i></button>',
      responsive: [{
          breakpoint: 1199,
          settings: {
            slidesToShow: 6,
          }
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 5
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 4
          }
        },
        {
          breakpoint: 400,
          settings: {
            slidesToShow: 3
          }
        }
      ]
    });
    // ========================= Client Slider Js End ===================

    // ================== Sidebar Menu Js Start ===============
    // Sidebar Dropdown Menu Start
    $(".has-dropdown > a").click(function () {
      $(".sidebar-submenu").slideUp(200);
      if (
        $(this)
        .parent()
        .hasClass("active")
      ) {
        $(".has-dropdown").removeClass("active");
        $(this)
          .parent()
          .removeClass("active");
      } else {
        $(".has-dropdown").removeClass("active");
        $(this)
          .next(".sidebar-submenu")
          .slideDown(200);
        $(this)
          .parent()
          .addClass("active");
      }
    });

    // Sidebar Icon & Overlay js 
    $(".dashboard-body__bar-icon").on("click", function () {
      $(".sidebar-menu").addClass('show-sidebar');
      $(".sidebar-overlay").addClass('show');
    });
    $(".sidebar-menu__close, .sidebar-overlay").on("click", function () {
      $(".sidebar-menu").removeClass('show-sidebar');
      $(".sidebar-overlay").removeClass('show');
    });
    // Sidebar Icon & Overlay js

    // filter sidebar
    $(".courses-sidebar-show").on("click", function () {
      $(".courses-sidebar").addClass('show-sidebar');
      $(".sidebar-overlay").addClass('show');
    });
    $(".courses-sidebar-close, .sidebar-overlay").on("click", function () {
      $(".courses-sidebar").removeClass('show-sidebar');
      $(".sidebar-overlay").removeClass('show');
    });

    // play content
    $(".play-content").on("click", function () {
      $(".playlist-sidebar").addClass('show-playlist');
      $(".sidebar-overlay").addClass('show');
    });
    $(".close-playcontent, .sidebar-overlay").on("click", function () {
      $(".playlist-sidebar").removeClass('show-playlist');
      $(".sidebar-overlay").removeClass('show');
    });

    // account sidebar
    $(".account-sidebar-show").on("click", function () {
      $(".dashboard-sidebar").addClass('show-sidebar');
      $(".sidebar-overlay").addClass('show');
    });
    $(".dashboard-sidebar__close, .sidebar-overlay").on("click", function () {
      $(".dashboard-sidebar").removeClass('show-sidebar');
      $(".sidebar-overlay").removeClass('show');
    });

    // lightcase
    $('a[data-rel^=lightcase]').lightcase();

    // ===================== Sidebar Menu Js End =================

    // ==================== Dashboard User Profile Dropdown Start ==================
    $('.user-info__button').on('click', function (event) {
      event.stopPropagation(); // Prevent the click event from propagating to the body
      $('.user-info-dropdown').toggleClass('show');
    });

    $('.user-info-dropdown__link').on('click', function (event) {
      event.stopPropagation(); // Prevent the click event from propagating to the body
      $('.user-info-dropdown').addClass('show')
    });

    $('body').on('click', function () {
      $('.user-info-dropdown').removeClass('show');
    })
    // ==================== Dashboard User Profile Dropdown End ==================

    // ==================== Custom Sidebar Dropdown Menu Js Start ==================
    $('.has-submenu').on('click', function (event) {
      event.preventDefault(); // Prevent the default anchor link behavior

      // Check if this submenu is currently visible
      var isOpen = $(this).find('.sidebar-submenu').is(':visible');

      // Hide all submenus initially
      $('.sidebar-submenu').slideUp();

      // Remove the "active" class from all li elements
      $('.sidebar-menu__item').removeClass('active');

      // If this submenu was not open, toggle its visibility and add the "active" class to the clicked li
      if (!isOpen) {
        $(this).find('.sidebar-submenu').slideToggle(500);
        $(this).addClass('active');
      }
    });
    // ==================== Custom Sidebar Dropdown Menu Js End ==================

    // ========================= Odometer Counter Up Js End ==========
    $(".teach-counter-item").each(function () {
      $(this).isInViewport(function (status) {
        if (status === "entered") {
          for (var i = 0; i < document.querySelectorAll(".odometer").length; i++) {
            var el = document.querySelectorAll('.odometer')[i];
            el.innerHTML = el.getAttribute("data-odometer-final");
          }
        }
      });
    });
    // ========================= Odometer Up Counter Js End =====================

  });
  // ==========================================
  //      End Document Ready function
  // ==========================================

  // ========================= Preloader Js Start =====================

  $(window).on("load", function () {
    $('.preloader').fadeOut();
  })
  // ========================= Preloader Js End =====================

  // ========================= Header Sticky Js Start ==============
  $(window).on('scroll', function () {
    if ($(window).scrollTop() >= 300) {
      $('.header').addClass('fixed-header');
    } else {
      $('.header').removeClass('fixed-header');
    }
  });
  // ========================= Header Sticky Js End ===================

  //============================ Scroll To Top Icon Js Start =========
  var btn = $('.scroll-top');

  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      btn.addClass('show');
    } else {
      btn.removeClass('show');
    }
  });

  btn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, '300');
  });

  var accordionItems = $('.module--accordion .accordion-item');
  accordionItems.slice(0, 3).show();
  $('.accordion-show__text').click(function () {
    accordionItems.show();
    $('.accordion-show').hide()
  });

  $(document).ready(function () {
    $('.comment-item__reply').each(function (index, item) {
      $(item).click(function (event) {
        event.stopPropagation();
        $('.comment-item__reply').not($(this)).removeClass('active');
        $(this).toggleClass('active');
        $('.comment-form').not($('.comment-form').eq(index)).slideUp();
        $('.comment-form').eq(index).slideToggle();
      });
    });

    $(window).click(function (event) {
      if (!$(event.target).closest('.comment-form').length) {
        $('.comment-item__reply').removeClass('active');
        $('.comment-form').slideUp();
      }
    });
  });

  // progress

  $(document).ready(function () {
    const $progress = $(".progress-statistic");
    const $progressValue = $(".progress-statistic__value");

    let startValue = 0;
    let endValue = 80;
    let Speed = 20;

    let progressBar = setInterval(function () {
      startValue++;
      $progressValue.text(startValue + "%");
      $progress.css("background",
        `conic-gradient(hsl(var(--base)) ${startValue * 3.6}deg, hsl(var(--warning)) 0deg)`);
      if (startValue === endValue) {
        clearInterval(progressBar);
      }
    }, Speed);
  });

  // bootstrap toast

  const toastTriggers = document.querySelectorAll('.liveToastBtn');
  const toastLiveExamples = document.querySelectorAll('.liveToast');

  toastTriggers.forEach((trigger, index) => {
    const toastBootstrap = new bootstrap.Toast(toastLiveExamples[index]);
    trigger.addEventListener('click', () => {
      toastBootstrap.show();
    });
  });

  // profile imnage upload

  $('.file-input').each(function (index, element) {
    $(element).on("change", function () {
      userImageChange(this, index);
    });
  });

  function userImageChange(input, index) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('.file-input-img').eq(index).attr('src', e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  // upload course video

  $('.course-video-input').each(function (index, element) {
    $(element).on("change", function () {
      if (this.files && this.files[0]) {
        const file = this.files[0];
        const videoURL = URL.createObjectURL(file);
        $('.course-video-preview').eq(index).attr('src', videoURL);

        $('.course-video-preview').eq(index).on('load', function () {
          URL.revokeObjectURL(videoURL);
        });
      }
    });
  });

  // upload video end

  $('.header-search__icon').on('click', function () {
    $('.header-search__wrapper').toggleClass("show");
  });

  $(document).on('click', function (e) {
    if (!$(e.target).closest('.header-search__wrapper').length &&
      !$(e.target).closest('.header-search__icon').length) {
      $('.header-search__wrapper').removeClass("show");
    }
  });

  // plyr js
  const player = new Plyr('.watch-video-preview', {
    captions: {
      active: true
    }
  });
  window.player = player;

  $('.comment-form__input').on('keyup', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  });

  // header height
  const headerHeight = document.querySelector('.header').offsetHeight;
  document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);

  // select2
  $('.select2-multiple').select2();

  $('.select2').each(function (index, element) {
    $(element).select2();
  });

  $('.select2-modal').each(function (index, element) {
    $(element).select2({
      dropdownParent: $(element).closest('.modal'),
    });
  });

  // updatebar
  function updateBar(navItem) {
    var width = navItem.outerWidth();
    var position = navItem.position().left;
    var top = navItem.position().top;
    $('.tab__bar').css({
      'width': width + 'px',
      'left': position + 'px',
    });
  }

  $('.nav-tabs .nav-link').on('click', function () {
    updateBar($(this))
  });

  var activeNavItem = $('.nav-tabs .nav-link.active');
  if (activeNavItem.length) {
    updateBar(activeNavItem)
  }

  // updatebar end

  // set goal calendar
  if ($('.set-goal-calendar').length) {
    $('.set-goal-calendar').on('click', '.weeks-calendar__item', function () {
      $('.weeks-calendar__item').removeClass('active');
      $(this).addClass('active');
    });

    function setGoalCalendarCount(item) {
      let left = item.position().left;
      $('.weeks-calendar-count').css('left', left);
      $('.weeks-calendar-count .number').text(item.data('value'));
    }

    $('.set-goal-calendar').on('mouseover', '.weeks-calendar__item', function () {
      setGoalCalendarCount($(this));
    });

    $('.set-goal-calendar').on('mouseleave', '.weeks-calendar__item', function () {
      setGoalCalendarCount($('.weeks-calendar__item.active'));
    });
    setGoalCalendarCount($('.weeks-calendar__item.active'));
  }

  // set goal calendar end

  // chart js
  if (document.getElementById('courseOverviewChart')) {
    const courseOverviewChart = document.getElementById('courseOverviewChart');
    const courseOverviewChartCtx = courseOverviewChart.getContext('2d');

    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'Course Overview',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          'rgb(154 550 40)',
          'rgb(205 120 100)',
          'rgb(255 100 185)',
          'rgb(16 224 203)',
          'rgb(221 160 221)',
          'rgb(255 218 185)',
          'rgb(120 28 212)'
        ],
        borderWidth: 0
      }]
    };

    const config = {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Profile View Statistics'
          }
        }
      }
    };

    new Chart(courseOverviewChartCtx, config);
  }

  if (document.getElementById('profileViewChart')) {
    const profileViewChart = document.getElementById('profileViewChart');
    const profileViewChartCtx = profileViewChart.getContext('2d');

    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'Course Overview',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          'rgb(154 550 40)',
          'rgb(205 120 100)',
          'rgb(255 100 185)',
          'rgb(16 224 203)',
          'rgb(221 160 221)',
          'rgb(255 218 185)',
          'rgb(120 28 212)'
        ],
        borderWidth: 0
      }]
    };

    const config = {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Profile View Statistics'
          }
        }
      }
    };

    new Chart(profileViewChartCtx, config);
  }
  // chart js end
})(jQuery);
