// 사용자 정보 표시 함수
function displayUserInfo() {
    const userEmail = localStorage.getItem('userEmail');
    const utilityMenu = document.querySelector('.utility-menu');
    
    if (userEmail) {
        // 로그인된 경우
        utilityMenu.innerHTML = `
            <span>${userEmail}</span>
            <button onclick="handleLogout()">로그아웃</button>
        `;
    }
}

// 로그아웃 처리
async function handleLogout() {
    try {
        await supabase.auth.signOut();
        localStorage.removeItem('userEmail');
        window.location.reload();
    } catch (error) {
        console.error('Logout error:', error);
    }
}

// 페이지 로드 시 사용자 정보 표시
document.addEventListener('DOMContentLoaded', displayUserInfo); 