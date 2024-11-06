// 구글 로그인 처리 부분
async function signInWithGoogle() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin // 리다이렉트 URL 명시적 설정
      }
    })
    
    if (error) throw error
    
    // 로그인 성공 후 상태 저장
    localStorage.setItem('isAuthenticated', 'true')
    updateUIState(true)
  } catch (error) {
    console.error('Google 로그인 에러:', error.message)
  }
}

// UI 상태 업데이트 함수
function updateUIState(isLoggedIn) {
  const loginElements = document.querySelectorAll('.login-only')
  const logoutElements = document.querySelectorAll('.logout-only')
  
  loginElements.forEach(el => el.style.display = isLoggedIn ? 'block' : 'none')
  logoutElements.forEach(el => el.style.display = isLoggedIn ? 'none' : 'block')
}