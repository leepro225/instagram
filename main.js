const _loading = document.querySelector('._4emnV');

function Module(url, urlInfo, selector, template) {
    const app = document.querySelector(selector);
    let page = 1;
    let totalPage = 1;   
     
    // 데이터 요청 및 가공
    const model = async () => {
        try {
            let result = await axios.get(url + page);
            page++;
            return result.data.data.map(l => l.reduce((o, v, i) => (o[`src${i+1}`] = v, o), {}));
        } catch (e) {
            return {};
        }
    };
    
    // 뷰 렌더링
    const view = (result) => {
        let html = '';
        result.forEach(data => {
            html += template.replace(/{{ *(\w+) *}}/g, (m, key) => data[key] || '');
        })
        app.innerHTML += html;
    };

    // 그 이외 
    const controller = async () => {
        _loading.style.display = '';

        excute();

        const timelineInfo = await axios.get(urlInfo);
        totalPage = timelineInfo.data.data.totalPage;

        addEvent(); 

        _loading.style.display = 'none';
    }

    // 스크롤 이벤트
    const scrollEvent = async function() {
            
        if(pageYOffset + document.scrollingElement.offsetHeight < document.body.scrollHeight * 0.9) { 
            return;
        }
        if('' === _loading.style.display) {
            return;
        }
        _loading.style.display = '';
        
        await excute();
        
        if(page > totalPage) {
            removeEvent();
        }
        
        _loading.style.display = 'none';
    }
    
    const addEvent = async () => {
        window.addEventListener('scroll', scrollEvent);        
    }
    
    const destroy = () => {
        removeEvent();
        app.innerHTML = '';
    }

    const removeEvent = () => {
        window.removeEventListener('scroll', scrollEvent);
    }

    const excute = async () => {
        view(await model());
    };

    controller();

    return {
        destroy : destroy
    }
}

function root() {
    const url = 'https://my-json-server.typicode.com/it-crafts/mockapi/timeline/';
    const urlInfo = url + "info";
    const selector = "#app";
    const template = `<div class="Nnq7C weEfm"><div class="v1Nh3 kIKUG _bz0w"><a href="javascript:;"><div class="eLAPa">
                    <div class="KL4Bh"><img class="FFVAD" decoding="auto" src="{{src1}}" style="object-fit: cover;"></div>
                    <div class="_9AhH0"></div></div><div class="u7YqG"><span aria-label="슬라이드" class="mediatypesSpriteCarousel__filled__32 u-__7"></span></div></a></div><div class="v1Nh3 kIKUG _bz0w"><a href="javascript:;">
                    <div class="eLAPa"><div class="KL4Bh"><img class="FFVAD" decoding="auto" src="{{  src2 }}" style="object-fit: cover;"></div><div class="_9AhH0"></div></div>
                    <div class="u7YqG"><span aria-label="슬라이드" class="mediatypesSpriteCarousel__filled__32 u-__7"></span></div></a></div>
                    <div class="v1Nh3 kIKUG _bz0w"><a href="javascript:;">
                    <div class="eLAPa"><div class="KL4Bh"><img class="FFVAD" decoding="auto" src="{{ src3  }}" style="object-fit: cover;"></div><div class="_9AhH0"></div></div>
                    <div class="u7YqG"><span aria-label="슬라이드" class="mediatypesSpriteCarousel__filled__32 u-__7"></span></div></a></div></div>`;
                  
    const clickEvent = async function(e) {
    
        if('' === _loading.style.display) {
            return;
        }
        // 컬러를 변경한다.
        let targetParent = this.parentNode.childNodes;

        console.log(targetParent);
        targetParent.forEach(function(crr) {
            if (crr.childNodes.length !== 0) {
                crr.className = '_9VEo1';
                crr.childNodes[0].className = crr.childNodes[0].className.replace(/blue/gi, 'grey');
            }
        });

        this.className = '_9VEo1 T-jvg';
        this.children[0].className = this.children[0].className.replace(/grey/gi, 'blue');
        
        // 기존 app의 이벤트를 제거한다
        module.destroy();
        
        // XXX 기존 app의 메모리를 초기화한다 -> network tab의 기존 메모리는 어떻게 초기화 할 수 있나요?
        
        
        // 새 app을 init한다
        module = new Module(url, urlInfo, selector, template);
    };
    
    document.querySelectorAll('.fx7hk > a').forEach(tabButton => {
        tabButton.addEventListener('click', clickEvent);
    });

    let module = new Module(url, urlInfo, selector, template);    
}

root();


