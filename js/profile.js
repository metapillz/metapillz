import { supabase } from '../lib/supabase.js';

// 페이지 로드 시 사용자 정보 표시
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 현재 로그인된 사용자 정보 가져오기
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) throw error;

        if (!user) {
            // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
            window.location.href = '/index.html';
            return;
        }

        // 이메일 표시
        const userEmailElement = document.getElementById('userEmail');
        if (userEmailElement) {
            userEmailElement.textContent = user.email;
        }
        
        // 가입일 표시 (한국 시간으로 변환)
        const joinDateElement = document.getElementById('joinDate');
        if (joinDateElement) {
            const joinDate = new Date(user.created_at);
            joinDateElement.textContent = joinDate.toLocaleDateString('ko-KR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        }

        // 저장된 사용자 메타데이터 표시
        if (user.user_metadata) {
            const { nickname, phone } = user.user_metadata;
            const nicknameInput = document.getElementById('nickname');
            const phoneInput = document.getElementById('phone');
            
            if (nicknameInput && nickname) {
                nicknameInput.value = nickname;
            }
            if (phoneInput && phone) {
                phoneInput.value = phone;
            }
        }

    } catch (error) {
        console.error('Error loading user data:', error.message);
    }
});

// 프로필 수정 폼 제출 처리
const profileForm = document.getElementById('profileForm');
if (profileForm) {
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        try {
            const nickname = document.getElementById('nickname')?.value || '';
            const phone = document.getElementById('phone')?.value || '';
            
            // 전화번호 형식 검사
            const phonePattern = /^010-\d{4}-\d{4}$/;
            if (!phonePattern.test(phone)) {
                alert('올바른 전화번호 형식을 입력해주세요. (예: 010-1234-5678)');
                return;
            }

            // 사용자 메타데이터 업데이트
            const { error } = await supabase.auth.updateUser({
                data: { 
                    nickname,
                    phone
                }
            });

            if (error) throw error;

            alert('프로필이 업데이트되었습니다.');
            window.location.reload();
            
        } catch (error) {
            console.error('Error updating profile:', error.message);
            alert('프로필 업데이트 중 오류가 발생했습니다.');
        }
    });
}

// 회원 탈퇴 처리
window.handleDeleteAccount = async function() {
    const confirmed = confirm('정말 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.');
    
    if (confirmed) {
        try {
            // 사용자 데이터 삭제
            const { data: { user }, error: userError } = await supabase.auth.getUser();
            if (userError) throw userError;

            if (user) {
                const { error: deleteError } = await supabase.auth.signOut();
                if (deleteError) throw deleteError;
                
                // 여기에 추가로 사용자 데이터 삭제 로직 추가 가능
                
                alert('회원 탈퇴가 완료되었습니다.');
                window.location.href = '/';
                
            } catch (error) {
                console.error('Error deleting account:', error.message);
                alert('회원 탈퇴 중 오류가 발생했습니다.');
            }
        }
    }
}
