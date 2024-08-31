class Game {
    constructor() {
        this.heading = "FIFA Dünya Kupası";
        this.content = "FIFA Dünya Kupası, uluslararası alanda futboldan sorumlu en üst düzey yönetim organı olan Uluslararası Futbol Federasyonları Birliği (FIFA) üyesi ülkelerin erkek millî takımlarının katılabildiği uluslararası futbol turnuvası. 1930'daki ilk turnuvadan beri, II. Dünya Savaşı sebebiyle gerçekleştirilemeyen 1942 ve 1946 yılları dışında dört yılda bir düzenlenmektedir."
        "Turnuvanın geçerli statüsünde, turnuva öncesindeki üç yıl boyunca süren eleme aşaması vardır. Günümüz itibarıyla FIFA üyesi 211 ülkenin katılabileceği elemeleri geçmeyi başaran takımlar, FIFA Dünya Kupası Finalleri adını taşıyan final aşamasında mücadele eder. Finallerde, o yılın turnuvasına ev sahipliği yapmasından ötürü eleme oynamaksızın direkt olarak katılan ev sahibi ülke veya ülkelerle birlikte toplamda 32 millî takım yer alır. Dörder takımdan oluşan sekiz gruba ayrılan katılımcılar, bu ilk aşamada grubundaki diğer takımlarla birer maç yaptıkları birinci turda yarışır. Grupları ilk iki sırada tamamlayan takımlar, tek maçlı eleme sistemiyle gerçekleştirilen ikinci aşamaya geçer. Final maçını kazanan takım şampiyon olurken üçüncü takımı belirleme amacıyla yarı finalde kaybeden 2 takım arasında bir üçüncülük maçı oynanır.";
        this.headingWords = this.heading.toLowerCase().split(/\s+/);
        this.contentWords = this.content.toLowerCase().split(/\s+/);
        this.guessedWords = new Set();
        this.guessCount = 0;

        this.headingElement = document.getElementById('heading');
        this.contentElement = document.getElementById('content');
        this.guessInput = document.getElementById('guess-input');
        this.guessButton = document.getElementById('guess-button');
        this.scoreElement = document.getElementById('score-value');

        this.guessButton.addEventListener('click', () => this.makeGuess());
        this.guessInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.makeGuess();
        });
    }

    init() {
        this.renderWords(this.headingElement, this.headingWords);
        this.renderWords(this.contentElement, this.contentWords);
    }

    renderWords(element, words) {
        element.innerHTML = '';
        words.forEach(word => {
            const wordElement = document.createElement('span');
            wordElement.className = 'word';
            wordElement.style.width = `${word.length * 10}px`;
            element.appendChild(wordElement);
            element.appendChild(document.createTextNode(' '));
        });
    }

    makeGuess() {
        const guess = this.guessInput.value.toLowerCase().trim();
        if (guess && !this.guessedWords.has(guess)) {
            this.guessedWords.add(guess);
            this.guessCount++;
            this.scoreElement.textContent = this.guessCount;
            this.updateWords(this.headingElement, this.headingWords, guess);
            this.updateWords(this.contentElement, this.contentWords, guess);
            this.checkWinCondition();
        }
        this.guessInput.value = '';
    }

    updateWords(element, words, guess) {
        const wordElements = element.getElementsByClassName('word');
        words.forEach((word, index) => {
            if (word === guess) {
                wordElements[index].textContent = word;
            }
        });
    }

    checkWinCondition() {
        const revealedHeadingWords = this.headingWords.filter(word => this.guessedWords.has(word));
        if (revealedHeadingWords.length === this.headingWords.length) {
            alert(`Congratulations! You've guessed the article: "${this.heading}". It took you ${this.guessCount} guesses.`);
            this.guessButton.disabled = true;
            this.guessInput.disabled = true;
        }
    }
}