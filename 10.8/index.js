function showImage(imageSrc, altText) {
    const fullImageDiv = document.getElementById('fullImage');
    
    const testImage = new Image();
    
    testImage.onload = function() {

        fullImageDiv.innerHTML = `<img src="${imageSrc}" alt="${altText}" style="max-width: 100%; max-height: 400px; border-radius: 5px;">`;
    };
    
    testImage.onerror = function() {

        fullImageDiv.innerHTML = `
            <div style="padding: 20px; color: #ff6b6b;">
                <p>Изображение не найдено</p>
            </div>
        `;
    };
    
    testImage.src = imageSrc;
}


document.addEventListener('DOMContentLoaded', function() {
    const thumbs = document.querySelectorAll('.thumb');
    
    thumbs.forEach((thumb, index) => {
        const img = thumb.querySelector('img');
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt');
        
        thumb.addEventListener('click', function() {
            showImage(src, alt);
            

            thumbs.forEach(t => {
                t.querySelector('img').style.borderColor = '#555';
            });
            

            img.style.borderColor = '#fff';
        });
        

        img.onerror = function() {
            this.style.opacity = '0.3';
            this.style.filter = 'grayscale(100%)';
        };
    });
    

    if (thumbs.length > 0) {
        const firstImg = thumbs[0].querySelector('img');
        showImage(firstImg.getAttribute('src'), firstImg.getAttribute('alt'));
        firstImg.style.borderColor = '#fff';
    }
});