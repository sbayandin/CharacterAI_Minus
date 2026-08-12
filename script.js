setTimeout(function() {
    let adBlockNames = [
            'Advertisement',
            'Anuncio',
            'Publicité',
            'Pubblicità',
            'Anúncio',
            'Werbeanzeige',
            'Reklam',
            'Reklama',
            'Реклама',
            'Iklan',
            '广告',
            '廣告',
            '広告',
            '광고',
            'โฆษณา',
            'Quảng cáo',
            //'Реклама', // взято из болгарского языка, но как будто бы и не надо. Точно такое же слово в русском
            //'Reklama', // тоже повторяется из другого языка
            'Διαφήμιση',
            'Mainos',
            'विज्ञापन',
            'Oglas',
            'Hirdetés',
            //'Reklama', //тоже повторяется
            'Reclame',
            'Annonse',
            'Reclamă',
            'Annons',
            //'Реклама', // снова повтор
        ];

    setInterval(function() {
        adBlockNames.forEach(blockName => {
            let adBlock = document
                .getElementById('main-content')
                .querySelector('[aria-label="' + blockName + '"]');

            if (adBlock) {
                adBlock.remove();
            }
        });
    }, 1000);

    setInterval(function() {
        let dropdownMenu = document.body.querySelector('[data-radix-popper-content-wrapper]');

        if (!dropdownMenu) {
            return;
        }

        let elements = dropdownMenu.querySelectorAll('[data-radix-collection-item]'),
            hasSuperRewind = false,
            rewindButton;
        let i = -1;
        elements.forEach(element => {
            i++;
            if (i !== 3) {
                return;
            }
            if (element.className.indexOf('super-rewind-button') !== -1) {
                hasSuperRewind = true;
            }
            rewindButton = element;
        });

        if (hasSuperRewind) {
            return;
        }

        /*lastElement.outerHTML += `
        <div role="menuitem" onclick="window.__SUPERREWINDFUNC()" class="super-rewind-button relative flex cursor-pointer rounded-spacing-s select-none items-center text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground" tabindex="-1" data-orientation="vertical" data-radix-collection-item="">
        
        <button class="z-0 group relative inline-flex items-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-unit-4 min-w-unit-20 h-unit-10 text-md gap-unit-2 rounded-md [&amp;&gt;svg]:max-w-[theme(spacing.unit-8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none bg-ghost text-primary data-[hover=true]:opacity-hover justify-between w-full rounded-spacing-s hover:bg-surface-elevation-2" type="button">
        ฅ^._.^ฅ SUPER REWIND
        </button>
        
        </div>
        `;*/

        let rewindButtonElement = rewindButton.querySelector('button');
        rewindButtonElement.innerHTML = 'ฅ^._.^ฅ SUPER REWIND';
        rewindButtonElement.onclick = window.__SUPERREWINDFUNC;
        rewindButtonElement.parentElement.onclick = window.__SUPERREWINDFUNC;
    }, 100);
}, 2000);

window.__SUPERREWINDFUNC = function() {
    let messages = document
        .getElementById('chat-messages')
        .querySelectorAll('.group.relative.max-w-3xl.m-auto.w-full'),
        beforeLastMessageLines = messages[1].querySelectorAll('p[node="[object Object]"]');

    let beforeLastMessageStripLines = [];

    beforeLastMessageLines.forEach(node => {
        let lineText = node.innerHTML
            .replaceAll("*", "\\*")
            .replaceAll("`", "\\`")
            .replaceAll("~", "\\~")
            .replaceAll("<em><strong>", "***")
            .replaceAll("</strong></em>", "***")
            .replaceAll("<em>", "*")
            .replaceAll("</em>", "*")
            .replaceAll("<strong>", "**")
            .replaceAll("</strong>", "**");

        beforeLastMessageStripLines.push(lineText);
    });

    let textarea = document
        .getElementById('chat-input-box')
        .querySelector('textarea');

    let value = beforeLastMessageStripLines.join("\n\n");
    console.log('[CharacerAI Minus]', 'value', value);
    console.log('[CharacerAI Minus]', 'textarea', textarea);
    const nativeInputValueSetter =
        Object.getOwnPropertyDescriptor(
            window.HTMLTextAreaElement.prototype,
            "value"
        ).set;

    nativeInputValueSetter.call(textarea, value);

    textarea.dispatchEvent(
        new Event("input", { bubbles: true })
    );
}
