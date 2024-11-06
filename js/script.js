import { supabase } from '../lib/supabase.js'

// 강의 데이터
const coursesData = {
    regular: [
        {
            id: 1,
            title: "개국의정석",
            badge: "인기",
            instructor: "이태영",
            duration: "3개월과정",
            time: "09:00-17:00",
            startDate: "2024.04.01",
            originalPrice: 2800000,
            price: 2500000,
            description: "약국 개업부터 운영까지 완벽 마스터 과정",
            discount: "얼리버드 할인"
        },
        {
            id: 2,
            title: "OTC 기초",
            badge: "신규",
            instructor: "강남성",
            duration: "1개월과정",
            time: "14:00-16:00",
            startDate: "2024.04.15",
            originalPrice: 990000,
            price: 790000,
            description: "일반의약품 기초부터 차근차근 배우는 과정",
            discount: "첫 수강 할인"
        }
    ],
    short: [
        {
            id: 3,
            title: "OTC 심화",
            instructor: "강남성",
            duration: "2주과정",
            time: "14:00-17:00",
            startDate: "2024.04.02",
            price: 590000,
            description: "OTC 기초를 수강한 분들을 위한 심화 과정"
        }
    ],
    online: [
        {
            id: 4,
            title: "매출을 부르는 인테리어",
            instructor: "아무나",
            duration: "1개월과정",
            access: "무제한 수강",
            price: 450000,
            description: "약국 인테리어 기획부터 시공까지 모든 것"
        }
    ]
}; 

// Google 로그인 처리
document.getElementById('google-login')?.addEventListener('click', async () => {
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/pages/index.html`
            }
        })
        
        if (error) throw error
        
        localStorage.setItem('isAuthenticated', 'true')
        closeLoginModal()
        
    } catch (error) {
        console.error('Google 로그인 오류:', error.message)
        alert('로그인 중 오류가 발생했습니다.')
    }
})

// 세션 체크 및 UI 업데이트
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const { data: { session } } = await supabase.auth.getSession()
        console.log('세션 상태:', session)
        
        if (session) {
            localStorage.setItem('isAuthenticated', 'true')
            
            document.querySelectorAll('.login-only').forEach(el => {
                el.style.display = 'none'
                console.log('login-only 숨김:', el)
            })
            
            document.querySelectorAll('.logout-only').forEach(el => {
                el.style.display = 'inline-block'
                console.log('logout-only 표시:', el)
            })
            
            const userEmailEl = document.getElementById('userEmail')
            if (userEmailEl && session.user?.email) {
                userEmailEl.textContent = session.user.email
            }
        } else {
            localStorage.removeItem('isAuthenticated')
            
            document.querySelectorAll('.login-only').forEach(el => {
                el.style.display = 'inline-block'
            })
            
            document.querySelectorAll('.logout-only').forEach(el => {
                el.style.display = 'none'
            })
        }
    } catch (error) {
        console.error('세션 체크 오류:', error)
    }
})

// 모달 제어 함수들
function openLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

function openSignupModal() {
    document.getElementById('signupModal').style.display = 'block';
    if(document.getElementById('loginModal')) {
        document.getElementById('loginModal').style.display = 'none';
    }
}

function closeSignupModal() {
    document.getElementById('signupModal').style.display = 'none';
}

function switchToLogin() {
    document.getElementById('signupModal').style.display = 'none';
    openLoginModal();
}

// 로그인 폼 제출 처리
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    console.log('로그인 시도:', email);
    window.location.href = '/profile.html';
});

// 회원가입 폼 제출 처리
document.getElementById('signupForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
    }

    console.log('회원가입 시도:', {name, email});
});

// 모달 외부 클릭시 닫기
window.onclick = function(event) {
    if (event.target.className === 'modal') {
        event.target.style.display = 'none';
    }
}

// 로그아웃 처리 함수
async function handleLogout() {
    console.log('로그아웃 시도')
    try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        
        console.log('로그아웃 성공')
        
        // 로컬 스토리지 클리어
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('user')
        
        // UI 업데이트
        document.querySelectorAll('.login-only').forEach(el => {
            el.style.display = 'inline-block'
        })
        document.querySelectorAll('.logout-only').forEach(el => {
            el.style.display = 'none'
        })
        
        // 메인 페이지로 리다이렉트
        window.location.href = 'index.html'
    } catch (error) {
        console.error('로그아웃 오류:', error.message)
        alert('로그아웃 중 오류가 발생했습니다.')
    }
}

// UI 업데이트 함수
function updateLoginUI(isLoggedIn) {
    const loginElements = document.querySelectorAll('.login-only')
    const logoutElements = document.querySelectorAll('.logout-only')
    
    if (isLoggedIn) {
        loginElements.forEach(el => el.style.display = 'none')
        logoutElements.forEach(el => el.style.display = 'block')
        
        const user = JSON.parse(localStorage.getItem('user'))
        if (user?.email) {
            document.getElementById('userEmail').textContent = user.email
        }
    } else {
        loginElements.forEach(el => el.style.display = 'block')
        logoutElements.forEach(el => el.style.display = 'none')
    }
}

// 페이지 로드시 로그인 상태 체크
document.addEventListener('DOMContentLoaded', async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
        localStorage.setItem('isAuthenticated', 'true')
        updateLoginUI(true)
    } else {
        updateLoginUI(false)
    }
})

// 로그아웃 버튼 이벤트 리스너 추가
document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.querySelector('.logout-link')
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout)
        console.log('로그아웃 버튼 이벤트 리스너 추가됨') // 디버깅용
    }
})