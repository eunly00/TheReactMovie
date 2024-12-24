export const preparePersonalizeData = () => {
    const username = localStorage.getItem('loggedInUser') || 'guest'; // 사용자 ID 가져오기
    const wishlist = JSON.parse(localStorage.getItem(`recommendations`)) || []; // 찜한 콘텐츠

    const interactions = wishlist.map((movie) => ({
        USER_ID: username,
        ITEM_ID: movie.id.toString(),
        TIMESTAMP: Math.floor(Date.now() / 1000), // 현재 Unix Timestamp
    }));

    return interactions;
};

export const downloadCSV = (data) => {
    // CSV 헤더 생성
    const csvContent =
        "USER_ID,ITEM_ID,TIMESTAMP\n" +
        data.map((row) => `${row.USER_ID},${row.ITEM_ID},${row.TIMESTAMP}`).join("\n");

    // Blob 생성
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    // 다운로드 트리거
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "interactions.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};
