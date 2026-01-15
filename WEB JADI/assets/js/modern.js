// ===== MODERN JAVASCRIPT ENHANCEMENTS =====

$(document).ready(function() {
    
    // ===== SMOOTH SCROLL WITH OFFSET =====
    $('.navbar-nav .nav-link').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 70
            }, 800, 'swing', function(){
                // Update active state
                $('.nav-link').removeClass('active');
                $('a[href="' + hash + '"]').addClass('active');
            });
        }
    });

    // ===== SCROLL SPY FOR NAVIGATION =====
    $(window).on('scroll', function() {
        var scrollPos = $(document).scrollTop() + 100;
        
        $('.navbar-nav .nav-link').each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            
            if (refElement.length && refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('.navbar-nav .nav-link').removeClass("active");
                currLink.addClass("active");
            } else {
                currLink.removeClass("active");
            }
        });
        
        // Header scroll effect
        if (scrollPos > 50) {
            $('.custom-header').addClass('scrolled');
        } else {
            $('.custom-header').removeClass('scrolled');
        }
        
        // Scroll to top button
        if (scrollPos > 300) {
            $('.scroll-top').addClass('show');
        } else {
            $('.scroll-top').removeClass('show');
        }
    });

    // ===== CHART.JS CONFIGURATION =====
    if (document.getElementById('aboutChart')) {
        var ctx = document.getElementById('aboutChart').getContext('2d');
        var aboutChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: chartLabels, // Dari PHP
                datasets: [{
                    label: 'Persentase Efektivitas (%)',
                    data: chartValues, // Dari PHP
                    backgroundColor: [
                        'rgba(145, 15, 15, 0.8)',
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(16, 185, 129, 0.8)'
                    ],
                    borderColor: [
                        'rgba(145, 15, 15, 1)',
                        'rgba(59, 130, 246, 1)',
                        'rgba(16, 185, 129, 1)'
                    ],
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            font: {
                                family: 'Inter',
                                size: 12,
                                weight: 600
                            },
                            padding: 15,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(26, 26, 46, 0.95)',
                        padding: 12,
                        cornerRadius: 8,
                        titleFont: {
                            size: 14,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 13
                        },
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y + '%';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)',
                            drawBorder: false
                        },
                        ticks: {
                            font: {
                                family: 'Inter',
                                size: 11,
                                weight: 500
                            },
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                family: 'Inter',
                                size: 11,
                                weight: 600
                            }
                        }
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }

    // ===== CARD HOVER 3D EFFECT =====
    $('.card').on('mousemove', function(e) {
        const card = $(this);
        const rect = card[0].getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.css('transform', `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.02)`);
    });
    
    $('.card').on('mouseleave', function() {
        $(this).css('transform', 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)');
    });

    // ===== SCROLL REVEAL ANIMATION =====
    function revealOnScroll() {
        $('.card, section h2, section p.lead').each(function() {
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animate-fade-in');
            }
        });
    }
    
    $(window).on('scroll resize', revealOnScroll);
    revealOnScroll(); // Initial check

    // ===== FORM VALIDATION ENHANCEMENT =====
    $('form').on('submit', function(e) {
        const form = $(this);
        const submitBtn = form.find('button[type="submit"]');
        
        // Add loading state
        submitBtn.addClass('loading').prop('disabled', true);
        submitBtn.html('<i class="fa fa-spinner fa-spin"></i> Mengirim...');
        
        // Form will submit normally, loading state will be visible during page transition
    });

    // ===== MODAL ENHANCEMENT =====
    $('.modal').on('show.bs.modal', function() {
        $(this).find('.modal-content').addClass('animate-fade-in');
    });

    // ===== AUTO DISMISS ALERTS =====
    setTimeout(function() {
        $('.alert').fadeOut('slow');
    }, 5000);

    // ===== SCROLL TO TOP FUNCTIONALITY =====
    $('body').append('<div class="scroll-top"><i class="fa fa-arrow-up"></i></div>');
    
    $('.scroll-top').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800, 'swing');
    });

    // ===== NAVBAR COLLAPSE ON MOBILE =====
    $('.navbar-nav .nav-link').on('click', function() {
        if ($(window).width() < 992) {
            $('.navbar-collapse').collapse('hide');
        }
    });

    // ===== PREVENT DOUBLE FORM SUBMISSION =====
    $('form').on('submit', function() {
        $(this).find('button[type="submit"]').prop('disabled', true);
    });

    // ===== LAZY LOAD IMAGES =====
    $('img').each(function() {
        $(this).on('load', function() {
            $(this).addClass('loaded');
        });
    });

    // ===== TYPING EFFECT FOR HERO (OPTIONAL) =====
    if ($('.hero-section .lead').length) {
        const text = $('.hero-section .lead').text();
        $('.hero-section .lead').text('');
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                $('.hero-section .lead').append(text.charAt(i));
                i++;
                setTimeout(typeWriter, 30);
            }
        }
        
        setTimeout(typeWriter, 500);
    }
});

// ===== PARALLAX EFFECT FOR HERO =====
$(window).on('scroll', function() {
    var scrolled = $(window).scrollTop();
    $('.hero-section .container').css('transform', 'translateY(' + (scrolled * 0.3) + 'px)');
    $('#heroCarousel').css('transform', 'translateY(' + (scrolled * 0.5) + 'px)');
});

// ===== PAGE LOAD ANIMATION =====
$(window).on('load', function() {
    $('body').addClass('loaded');
    
    // Animate elements on load
    setTimeout(function() {
        $('.hero-section h1, .hero-section .lead').addClass('animate-fade-in');
    }, 100);
});