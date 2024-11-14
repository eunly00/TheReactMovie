class AuthService {
    // 로그인 시도
    tryLogin(email, password, saveToken = true) {
        return new Promise((resolve, reject) => {
            const users = JSON.parse(localStorage.getItem('users') || '[]'); // 저장된 사용자 목록 가져오기
            const user = users.find(user => user.id === email); // 해당 이메일로 사용자 찾기

            if (!user) {
                reject(new Error('로그인 실패! 존재하지 않는 이메일입니다.'));
            } else if (user.password !== password) {
                reject(new Error('로그인 실패! 비밀번호가 일치하지 않습니다.'));
            } else {
                if (saveToken) {
                    localStorage.setItem('TMDb-Key', user.password); // 로그인 여부 확인용 토큰 저장
                    localStorage.setItem('isLoggedIn', 'true'); // 로그인 상태 저장
                    localStorage.setItem('username', email); // 현재 사용자 이름 저장
                }
                resolve(user); // 로그인 성공
            }
        });
    }

    // 회원가입 시도
    tryRegister(email, password, confirmPassword, acceptTerms) {
        return new Promise((resolve, reject) => {
            try {
                const users = JSON.parse(localStorage.getItem('users') || '[]'); // 저장된 사용자 목록 가져오기
                const userExists = users.some(existingUser => existingUser.id === email); // 이메일 중복 확인

                // 유효성 검사
                if (!email || !password || !confirmPassword) {
                    throw new Error('모든 필드를 입력해주세요.');
                }
                if (userExists) {
                    throw new Error('이미 존재하는 이메일입니다.');
                }
                if (!acceptTerms) {
                    throw new Error('약관에 동의해야 가입이 가능합니다.');
                }
                if (password !== confirmPassword) {
                    throw new Error('확인 비밀번호가 일치하지 않습니다.');
                }

                // 새로운 사용자 추가
                const newUser = { id: email, password: password };
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users)); // 사용자 목록 업데이트
                resolve(); // 회원가입 성공
            } catch (err) {
                reject(err); // 유효성 검사 실패 시 에러 반환
            }
        });
    }

    // 로그인 상태 확인
    isLoggedIn() {
        return new Promise((resolve) => {
            const token = localStorage.getItem('TMDb-Key');
            resolve(!!token); // 토큰이 존재하면 로그인 상태로 간주
        });
    }

    // 로그아웃 처리
    logout() {
        localStorage.removeItem('TMDb-Key'); // 로그인 토큰 삭제
        localStorage.removeItem('isLoggedIn'); // 로그인 상태 삭제
        localStorage.removeItem('username'); // 현재 사용자 이름 삭제
    }
}

export default new AuthService();
