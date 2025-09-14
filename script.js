// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // 모바일 메뉴 토글
    initMobileMenu();
    
    // FAQ 토글 기능
    initFaqToggles();
    
    // FAQ 카테고리 전환
    initFaqCategories();
    
    // 할인 계산기
    initDiscountCalculator();
    
    // 스무스 스크롤
    initSmoothScroll();
    
    // 애니메이션 효과
    initAnimations();
});

// 모바일 메뉴 초기화
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // 메뉴 링크 클릭 시 메뉴 닫기
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// FAQ 토글 기능
function initFaqToggles() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    console.log('FAQ questions found:', faqQuestions.length);
    
    faqQuestions.forEach((question, index) => {
        question.addEventListener('click', function() {
            console.log('FAQ clicked:', index);
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // 현재 FAQ 토글
            if (isActive) {
                faqItem.classList.remove('active');
                console.log('FAQ closed');
            } else {
                // 다른 FAQ 닫기
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });
                // 현재 FAQ 열기
                faqItem.classList.add('active');
                console.log('FAQ opened');
            }
        });
    });
}

// FAQ 토글 함수 (외부에서 호출 가능) - 호환성을 위해 유지
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // 현재 FAQ 토글
    if (isActive) {
        faqItem.classList.remove('active');
    } else {
        // 다른 FAQ 닫기
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        // 현재 FAQ 열기
        faqItem.classList.add('active');
    }
}

// FAQ 카테고리 전환
function initFaqCategories() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const faqCategories = document.querySelectorAll('.faq-category');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            
            // 버튼 활성화 상태 변경
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 카테고리 표시/숨김
            faqCategories.forEach(cat => {
                cat.classList.remove('active');
            });
            
            const targetCategory = document.getElementById(category + '-faq');
            if (targetCategory) {
                targetCategory.classList.add('active');
            }
        });
    });
}

// FAQ 카테고리 전환 함수 (외부에서 호출 가능)
function showFaqCategory(category) {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const faqCategories = document.querySelectorAll('.faq-category');
    
    // 버튼 활성화 상태 변경
    categoryBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('onclick').includes(category)) {
            btn.classList.add('active');
        }
    });
    
    // 카테고리 표시/숨김
    faqCategories.forEach(cat => {
        cat.classList.remove('active');
    });
    
    const targetCategory = document.getElementById(category + '-faq');
    if (targetCategory) {
        targetCategory.classList.add('active');
    }
}

// 할인 계산기 초기화
function initDiscountCalculator() {
    const tradingAmountInput = document.getElementById('tradingAmount');
    const newUserCheckbox = document.getElementById('newUser');
    const vipUserCheckbox = document.getElementById('vipUser');
    const bthUserCheckbox = document.getElementById('bthUser');
    
    if (tradingAmountInput) {
        tradingAmountInput.addEventListener('input', calculateDiscount);
    }
    if (newUserCheckbox) {
        newUserCheckbox.addEventListener('change', calculateDiscount);
    }
    if (vipUserCheckbox) {
        vipUserCheckbox.addEventListener('change', calculateDiscount);
    }
    if (bthUserCheckbox) {
        bthUserCheckbox.addEventListener('change', calculateDiscount);
    }
}

// 할인 계산 함수
function calculateDiscount() {
    const tradingAmount = parseFloat(document.getElementById('tradingAmount')?.value) || 0;
    const newUser = document.getElementById('newUser')?.checked || false;
    const vipUser = document.getElementById('vipUser')?.checked || false;
    const bthUser = document.getElementById('bthUser')?.checked || false;
    
    if (tradingAmount <= 0) {
        updateCalculatorResult(0, 0, 0);
        return;
    }
    
    // 기본 수수료 (0.25%)
    const normalFee = tradingAmount * 0.0025;
    
    // 할인 적용
    let discountRate = 0;
    
    if (newUser) discountRate += 0.5; // 50% 할인
    if (vipUser) discountRate += 0.4; // 40% 할인 (VIP 2 기준)
    if (bthUser) discountRate += 0.1; // 10% 할인 (BTH 5,000개 기준)
    
    // 최대 90% 할인 제한
    discountRate = Math.min(discountRate, 0.9);
    
    const discountedFee = normalFee * (1 - discountRate);
    const savings = normalFee - discountedFee;
    
    updateCalculatorResult(normalFee, discountedFee, savings);
}

// 계산기 결과 업데이트
function updateCalculatorResult(normalFee, discountedFee, savings) {
    const normalFeeElement = document.getElementById('normalFee');
    const discountedFeeElement = document.getElementById('discountedFee');
    const savingsElement = document.getElementById('savings');
    
    if (normalFeeElement) {
        normalFeeElement.textContent = formatNumber(normalFee) + '원';
    }
    if (discountedFeeElement) {
        discountedFeeElement.textContent = formatNumber(discountedFee) + '원';
    }
    if (savingsElement) {
        savingsElement.textContent = formatNumber(savings) + '원';
    }
}

// 숫자 포맷팅
function formatNumber(num) {
    return Math.round(num).toLocaleString();
}

// 스무스 스크롤 초기화
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // 헤더 높이 고려
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 애니메이션 효과 초기화
function initAnimations() {
    // Intersection Observer를 사용한 스크롤 애니메이션
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 애니메이션 대상 요소들
    const animatedElements = document.querySelectorAll('.benefit-card, .step-card, .support-card, .discount-card, .event-card');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// 이벤트 상세로 스크롤
function scrollToEvent() {
    const eventSection = document.getElementById('event-details');
    if (eventSection) {
        const offsetTop = eventSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// 쿠폰 모달 표시
function showCouponModal() {
    const modal = document.getElementById('couponModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// 쿠폰 모달 닫기
function closeCouponModal() {
    const modal = document.getElementById('couponModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// 쿠폰 코드 복사
function copyCouponCode() {
    const couponCode = document.getElementById('couponCode');
    if (couponCode) {
        navigator.clipboard.writeText(couponCode.textContent).then(function() {
            alert('쿠폰 코드가 복사되었습니다!');
        }).catch(function() {
            // 클립보드 API를 사용할 수 없는 경우 대체 방법
            const textArea = document.createElement('textarea');
            textArea.value = couponCode.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('쿠폰 코드가 복사되었습니다!');
        });
    }
}

// 프로모션 코드 복사
function copyPromoCode(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        navigator.clipboard.writeText(element.textContent).then(function() {
            alert('프로모션 코드가 복사되었습니다!');
        }).catch(function() {
            // 클립보드 API를 사용할 수 없는 경우 대체 방법
            const textArea = document.createElement('textarea');
            textArea.value = element.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('프로모션 코드가 복사되었습니다!');
        });
    }
}

// 미션 가이드 표시
function showMissionGuide() {
    alert('웰컴 미션 가이드:\n\n1. 빗썸 앱에 로그인\n2. 메뉴 → 혜택/서비스 선택\n3. 웰컴미션 섹션에서 미션 참여\n\n각 미션을 완료할 때마다 보상을 받을 수 있습니다!');
}

// 고객센터 전화
function callSupport() {
    if (confirm('빗썸 고객센터(1588-1234)로 전화하시겠습니까?')) {
        window.location.href = 'tel:1588-1234';
    }
}

// 실시간 채팅 시작
function startChat() {
    alert('실시간 채팅 서비스는 준비 중입니다.\n\n전화 문의: 1588-1234\n이메일: support@bithumb.com');
}

// 이메일 보내기
function sendEmail() {
    window.location.href = 'mailto:support@bithumb.com?subject=빗썸 7만원 이벤트 문의';
}

// 추천 정보 표시
function showReferralInfo() {
    alert('친구 추천 이벤트:\n\n• 추천인과 피추천인 각각 10,000원 지급\n• 피추천인이 신규 가입 후 첫 거래 완료 시 지급\n• 상시 진행\n\n추천 코드: FRIEND10000');
}

// 거래 정보 표시
function showTradingInfo() {
    alert('첫 거래 보너스:\n\n• 신규 가입자 대상\n• 첫 거래 완료 시 5,000원 추가 지급\n• 거래 수수료와 별도로 지급\n\n거래 코드: TRADE5000');
}

// 입금 정보 표시
function showDepositInfo() {
    alert('입금 보너스:\n\n• 입금 금액의 1% 추가 지급\n• 최대 50,000원까지 지급\n• 월 1회 제한\n• KB국민은행 계좌 입금 시에만 적용');
}

// 거래왕 대회 정보 표시
function showTradingKingInfo() {
    alert('거래왕 대회:\n\n• 월간 거래량 순위에 따른 상금 지급\n• 1위: 100만원, 2위: 50만원, 3위: 30만원\n• 매월 1일부터 말일까지 진행\n• 거래량 기준으로 순위 결정');
}

// 에어드랍 이벤트 정보 표시
function showAirdropInfo() {
    alert('신규 코인 거래 에어드랍:\n\n• 신규 상장 코인 거래 시 에어드랍 혜택\n• 거래량에 비례하여 신규 코인 지급\n• 한정 기간 동안만 진행\n• 상장 후 1주일간 혜택 제공');
}

// 출석 체크 이벤트 정보 표시
function showAttendanceInfo() {
    alert('출석 체크 이벤트:\n\n• 매일 앱 접속 시 출석 체크 가능\n• 연속 출석일수에 따라 혜택 증가\n• 7일 연속: 1,000원, 30일 연속: 5,000원\n• 누적 출석일수에 따른 추가 혜택');
}

// VIP 혜택 정보 표시
function showVipInfo() {
    alert('VIP 등급 혜택:\n\n• 거래량에 따른 자동 등급 부여\n• VIP 1: 20% 할인, VIP 2: 40% 할인\n• VIP 3: 60% 할인, VIP 4: 80% 할인\n• 매월 1일 기준으로 등급 업데이트');
}

// 거래왕 대회 상세 정보
function showTradingKingInfo() {
    alert('제9회 빗썸 거래왕 대회:\n\n• 기간: 2025.9.2 ~ 9.15 (종료)\n• 총 상금: 7,500만원 (코인별 300만원씩)\n• 대상: 25개 알트코인 (볼타, 알고랜드, 카이토 등)\n• 수상자: 1,250명 (코인별 상위 50명)\n• 조건: 코인별 10만원 이상 거래\n• 참가신청: 이벤트 페이지에서 필수 신청\n• 상금 지급: 9월 24일~10월 10일');
}

// 신규 코인 에어드랍 상세 정보
function showAirdropInfo() {
    alert('신규 코인 상장 기념 에어드랍:\n\n• 대상 코인: WLFI, OPEN 등 신규 상장 코인\n• 기간: 상장 전후 1~3일 (매우 짧음)\n• 조건: 해당 코인 1회 거래 또는 순입금\n• 보상: 신규 코인 토큰 무료 지급\n• 분배: 균등분배 또는 기여도 비례분배\n• 지급: 이벤트 종료 후 1~2주 내 자동 입금\n• 특징: 수천원~수만원 상당 소액 혜택');
}

// 출석체크 상세 정보
function showAttendanceInfo() {
    alert('매일매일 출석체크 이벤트:\n\n• 기간: 상시 진행 (매월 리셋)\n• 조건: 앱/웹 하루 1회 접속 후 출석 클릭\n• 보상: 매일 10P 즉시 지급\n• 연속 보너스:\n  - 7일 연속: +100P\n  - 14일 연속: +300P\n  - 21일 연속: +500P\n  - 30일 개근: +1,000P\n• 월 최대: 1,910P (약 1,910원)\n• 활용: 거래 수수료 차감 또는 출금 가능');
}

// 친구초대 상세 정보
function showReferralInfo() {
    alert('친구초대 서비스 (멤버스 겟 멤버스):\n\n• 기간: 상시 진행\n• 추천인 혜택: 친구 1명당 3만원\n• 피추천인 혜택: 5만원 + 웰컴미션 2만원 = 7만원\n• 최대 초대: 3,333명 (최대 1억원)\n• 조건: 신규 가입 + 7일 내 코드 등록 + 계좌인증\n• 지급: 조건 완료 즉시 양측 자동 지급\n• 특징: 양방향 윈윈 구조');
}

// 텔레그램 이벤트 상세 정보
function showTelegramInfo() {
    alert('텔레그램 채널 5만 돌파 기념 이벤트:\n\n• 기간: 2025.8.27 ~ 9.30+\n• 조건: 텔레그램 신규 구독 + 이벤트 폼 제출 + 거래 1회\n• 보상: 전원 BTC 5천원 + 아이폰17 추첨 (10명)\n• BTC 지급: 신청 달 다음 달 10일\n• 아이폰 지급: 2025년 10월 중\n• 세금: 아이폰 당첨 시 22% 제세공과금 부담\n• 특징: 구독만 해도 5천원, 거래하면 아이폰 기회');
}

// 코인대여 이벤트 상세 정보
function showLendingInfo() {
    alert('코인대여 첫 이용 감사 이벤트:\n\n• 기간: 2025.9.10 ~ 10.10\n• 조건: 과거 거래 100만원 이상 + 기간 내 코인대여 첫 이용\n• 보상: 5,000P (현금 5천원 상당)\n• 최소 이용: 10만원 이상 대여\n• 지급: 이벤트 종료 후 1~2주 내\n• 특징: 선착순 제한, 한 계정당 1회만\n• 주의: 레버리지 위험성 고려 필요');
}

// 오프라인 이벤트 상세 정보
function showOfflineInfo() {
    alert('KBW2025 빗썸존 이벤트:\n\n• 기간: 2025.9.23 ~ 9.24\n• 장소: 코리아블록체인위크(KBW) 행사장\n• 조건: 현장 방문 + 부스 미션 참여\n• 보상: 최대 15만원 상당 에어드랍 + 한정 굿즈\n• 특징: 20여개 프로젝트 재단과 협업\n• 굿즈: 빗썸BTC빵 등 한정판 아이템\n• 대상: 블록체인 행사 참석자');
}

// 문의 양식 제출
document.addEventListener('DOMContentLoaded', function() {
    const inquiryForm = document.getElementById('inquiryForm');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const inquiryType = document.getElementById('inquiryType').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!inquiryType || !email || !subject || !message) {
                alert('모든 필수 항목을 입력해주세요.');
                return;
            }
            
            // 이메일 형식 검증
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('올바른 이메일 주소를 입력해주세요.');
                return;
            }
            
            // 문의 내용을 이메일로 전송 (실제 구현에서는 서버로 전송)
            const emailBody = `문의 유형: ${inquiryType}\n이메일: ${email}\n제목: ${subject}\n내용: ${message}`;
            const mailtoLink = `mailto:support@bithumb.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
            
            if (confirm('문의 내용을 이메일로 전송하시겠습니까?')) {
                window.location.href = mailtoLink;
                this.reset();
                alert('문의가 접수되었습니다. 빠른 시일 내에 답변드리겠습니다.');
            }
        });
    }
});

// 모달 외부 클릭 시 닫기
window.addEventListener('click', function(event) {
    const modal = document.getElementById('couponModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// ESC 키로 모달 닫기
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('couponModal');
        if (modal && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    }
});

// 페이지 로드 시 애니메이션
window.addEventListener('load', function() {
    // 로딩 애니메이션 (선택사항)
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
    
    // 히어로 섹션 애니메이션
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(50px)';
        heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
        
        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }
});

// 스크롤 시 헤더 스타일 변경
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(102, 126, 234, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            navbar.style.backdropFilter = 'none';
        }
    }
});

// 숫자 카운터 애니메이션
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// 뷰포트에 들어올 때 카운터 애니메이션 실행
const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const amountElement = entry.target.querySelector('.benefit-amount');
            if (amountElement && !amountElement.dataset.animated) {
                const amount = parseInt(amountElement.textContent.replace(/[^0-9]/g, ''));
                amountElement.textContent = '0원';
                animateCounter(amountElement, amount);
                amountElement.dataset.animated = 'true';
            }
        }
    });
}, { threshold: 0.5 });

// 카운터 애니메이션 대상 요소들 관찰
document.querySelectorAll('.benefit-card').forEach(card => {
    counterObserver.observe(card);
});

// 터치 디바이스에서 스와이프 제스처 지원 (선택사항)
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // 왼쪽으로 스와이프 (다음 페이지)
            console.log('Left swipe');
        } else {
            // 오른쪽으로 스와이프 (이전 페이지)
            console.log('Right swipe');
        }
    }
}
