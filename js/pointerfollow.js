let start = new Date().getTime();

const originPosition = { x: 0, y: 0 };

const last = {
    starTimestamp: start,
    starPosition: originPosition,
    mousePosition: originPosition
}

const config = {
    starAnimationDuration: 1500,
    minimumTimeBetweenStars: 250,
    minimumDistanceBetweenStars: 75,
    glowDuration: 75,
    maximumGlowPointSpacing: 10,
    // 澧炲姞浜嗗嚑绉嶉鑹�
    colors: ["249 146 253", "252 254 255", "66 185 131", "250 173 20", "35 120 4", "54 207 201", "0 62 179", "57 16 133", "158 16 104", "0 0 0"],
    // 鏁寸偣鏈夋剰鎬濈殑鍐呭
    innerhtmls: ["3.14", "1024", "鈧嶀悽..釔⑩値鈾�", "喙戓祾岑呩祾喙�", "鈥⑧鈥�", "ddl", "鉁�", "鈽�", "鍔犺!", "釙扁憛釙�", "鉁�", "潞路 鈽舅氣€郝�", " 釆�", "釈�", " 釆�", "鈪�", "鈪�", "鈪�", "鉂�", "{}", "int", "long", "const", "seg-tree", "return", "vue", "run", "void", "violin", "鍠靛柕", "姹紒", "91.8", "peace", "love", "鍢垮樋", "find", "绯熺硶", "miao", "銇�", "銈�", "銇�", "馃尮", "bool", "flag"],
    sizes: ["1.4rem", "1rem", "0.6rem"],
    animations: ["fall-1", "fall-2", "fall-3"]
}

let count = 0;

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
    selectRandom = items => items[rand(0, items.length - 1)];

const withUnit = (value, unit) => `${value}${unit}`,
    px = value => withUnit(value, "px"),
    ms = value => withUnit(value, "ms");

const calcDistance = (a, b) => {
    const diffX = b.x - a.x,
        diffY = b.y - a.y;

    return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
}

const calcElapsedTime = (start, end) => end - start;

const appendElement = element => document.body.appendChild(element),
    removeElement = (element, delay) => setTimeout(() => document.body.removeChild(element), delay);


const createStar = position => {
    const star = document.createElement("span"),
        color = selectRandom(config.colors);

    star.className = "star";
    // 杩欐槸鎴戝垹鎺夋槦鏄熷浘鏍囧啓鐨勫唴瀹癸紝璁剧疆浜嗛殢鏈哄睍绀轰竴浜涘瓧绗�
    star.innerHTML = selectRandom(config.innerhtmls);

    star.style.left = px(position.x);
    star.style.top = px(position.y);
    star.style.fontSize = selectRandom(config.sizes);
    star.style.color = `rgb(${color})`;
    star.style.textShadow = `0px 0px 1.5rem rgb(${color} / 0.5)`;
    star.style.animationName = config.animations[count++ % 3];
    star.style.starAnimationDuration = ms(config.starAnimationDuration);

    appendElement(star);

    removeElement(star, config.starAnimationDuration);
}

const determinePointQuantity = distance => Math.max(
    Math.floor(distance / config.maximumGlowPointSpacing),
    1
);

// 杩欎竴娈垫槸鍘熶綔鑰呯殑璇�

/* --  

The following is an explanation for the "createGlow" function below:

I didn't cover this in my video, but I ran into an issue where moving the mouse really quickly caused gaps in the glow effect. Kind of like this:

*   *       *       *    *      *    馃柋锔�

instead of:

*************************************馃柋锔�

To solve this I sort of "backfilled" some additional glow points by evenly spacing them in between the current point and the last one. I found this approach to be more visually pleasing than one glow point spanning the whole gap.

The "quantity" of points is based on the config property "maximumGlowPointSpacing".

My best explanation for why this is happening is due to the mousemove event only firing every so often. I also don't think this fix was totally necessary, but it annoyed me that it was happening so I took on the challenge of trying to fix it.

-- */
const updateLastStar = position => {
    last.starTimestamp = new Date().getTime();

    last.starPosition = position;
}

const updateLastMousePosition = position => last.mousePosition = position;

const adjustLastMousePosition = position => {
    if (last.mousePosition.x === 0 && last.mousePosition.y === 0) {
        last.mousePosition = position;
    }
};

const handleOnMove = e => {
    const mousePosition = { x: e.clientX, y: e.clientY }

    adjustLastMousePosition(mousePosition);

    const now = new Date().getTime(),
        hasMovedFarEnough = calcDistance(last.starPosition, mousePosition) >= config.minimumDistanceBetweenStars,
        hasBeenLongEnough = calcElapsedTime(last.starTimestamp, now) > config.minimumTimeBetweenStars;

    if (hasMovedFarEnough || hasBeenLongEnough) {
        createStar(mousePosition);

        updateLastStar(mousePosition);
    }

    updateLastMousePosition(mousePosition);
}

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);

document.body.onmouseleave = () => updateLastMousePosition(originPosition);