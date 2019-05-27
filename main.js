var cursor, camera, player, gereedschapsrek, instructie, watmoetjedoen, apiinsect;

window.onload = function() {

    cursor = document.getElementById("js--cursor");
    camera = document.getElementById("js--camera");
    player = document.getElementById("js--player");

    instructie = document.getElementById("js--instructie");
    watmoetjedoen = document.getElementById("js--watmoetjedoen");
    apiinsect = document.getElementById("js--APIinsect");

    gereedschapsrek = document.getElementById("js--gereedschapsrek");

    getCoords();
    getINaturalist(lat, lon);


    gereedschap({
        el: document.getElementById("js--zaag"),
        posHand: ["0.4 -0.4 -0.6","-15 185 0","1 1 1"],
        posHitbox: ["0 0.074 0.17","4 0 0","0.1 0.2 0.7"],
        elmuur: document.getElementById("js--zaagmuur"),
        posMuur: ["-0.05 0.2 -0.2","90 0 0","1 1 1"],
        acties: [
            {
                selector: document.getElementById("js--zaagselect1"),
                posBezig: ["0 0.3 2","0 180 0","16 16 16"],
                selectHitbox: ["0 0 0", "0 0 0", "1.1 1.1 1.1"],
                func: function() {
                    document.getElementById("js--stap1").setAttribute("visible", "false");
                    document.getElementById("js--stap2").setAttribute("visible", "true");
                    var plank1 = document.getElementById("js--plank1");
                    plank1.setAttribute("scale","8 0.5 2");
                    plank1.setAttribute("position","0 0.25 0");
                    instructie.setAttribute("value", "2. Hang de zaag op aan de muur. Pak de hamer op en sla de spijker (linksonder) erin.");
                    document.getElementsByClassName("spijker")[0].setAttribute("visible","true");
                }
            },
            {
                selector: document.getElementById("js--zaagselect3"),
                posBezig: ["0 0.3 2","0 180 0","16 16 16"],
                selectHitbox: ["0 0 0", "0 0 0", "1.1 1.1 1.1"],
                func: function() {
                    document.getElementById("js--stap6").setAttribute("visible", "true");
                    document.getElementById("js--stap5").setAttribute("visible", "false");
                    var plank3 = document.getElementById("js--plank3");
                    plank3.setAttribute("scale","8 0.5 2");
                    plank3.setAttribute("position","12 0.25 0");
                    instructie.setAttribute("value", "6. Hang de zaag op. Pak nu de zojuist gezaagde plank op en hang deze in het huis op de goede plek.");
                    pickup({
                        el: plank3,
                        posHand: ["0.6 0 -1","0 0 0","0.5 0.03125 0.125"],
                        posHitbox: ["0 0 0", "0 0 0", "1.1 1.1 1.1"],
                        selectors: [
                            {
                                selector: document.getElementById("js--plankselect3"),
                                posSelect: ["0 5 0","0 0 0","8 0.5 2"],
                                selectHitbox: ["0 0 0", "0 0 0", "1.1 1.1 1.1"],
                                func: function(el) {
                                    document.getElementById("js--stap7").setAttribute("visible", "true");
                                    document.getElementById("js--stap71").setAttribute("visible", "true");
                                    document.getElementById("js--stap6").setAttribute("visible", "false");
                                    instructie.setAttribute("value", "7. Pak de hamer weer op en sla nu aan beide kanten er een spijker in");
                                    setTimeout(function() {klik.disable(el.children[0]);}, 1010);
                                    let spijkers = document.getElementsByClassName("spijker");
                                    for(let i = 2; i < 4; i++) {
                                        spijkers[i].setAttribute("visible","true");
                                    }
                                }
                            }
                        ]
                    });
                }
            },
            {
                selector: document.getElementById("js--zaagselect5"),
                posBezig: ["0 0.3 2","0 180 0","16 16 16"],
                selectHitbox: ["0 0 0", "0 0 0", "1.1 1.1 1.1"],
                func: function() {
                    var plank5 = document.getElementById("js--plank5");
                    plank5.setAttribute("scale","5 0.5 2");
                    plank5.setAttribute("position","34.5 0.25 -2.5");
                    document.getElementById("js--stap12").setAttribute("visible", "true");
                    document.getElementById("js--stap11").setAttribute("visible", "false");
                    instructie.setAttribute("value", "12. Hang de zaag op. Positioneer nu de zojuist gezaagde plank op de goede plek");
                    pickup({
                        el: plank5,
                        posHand: ["0.6 0 -1","0 0 90","0.3125 0.03125 0.125"],
                        posHitbox: ["0 0 0", "0 0 0", "1.1 1.1 1.1"],
                        selectors: [
                            {
                                selector: document.getElementById("js--plankselect5"),
                                posSelect: ["0 7.5 0","0 0 90","5 0.5 2"],
                                selectHitbox: ["0 0 0", "0 0 0", "1.1 1.1 1.1"],
                                func: function(el) {
                                    document.getElementById("js--stap13").setAttribute("visible", "true");
                                    document.getElementById("js--stap12").setAttribute("visible", "false");
                                    instructie.setAttribute("value", "13. Pak nu de kniptang op. Knip 10 cm van het gaas af.");
                                    setTimeout(function() {klik.disable(el.children[0]);}, 1010);
                                    document.getElementsByClassName("gaaspos")[0].setAttribute("visible","true");
                                }
                            }
                        ]
                    });
                }
            },
            {
                selector: document.getElementById("js--zaagselect6"),
                posBezig: ["0 0.3 2","0 180 0","16 16 16"],
                selectHitbox: ["0 0 0", "0 0 0", "1.1 1.1 1.1"],
                func: function() {
                    var plank6 = document.getElementById("js--plank6");
                    plank6.setAttribute("scale","8 0.5 2");
                    plank6.setAttribute("position","36 0.25 2.5");
                    document.getElementById("js--stap9").setAttribute("visible", "true");
                    document.getElementById("js--stap8").setAttribute("visible", "false");
                    instructie.setAttribute("value", "9. Hang de zaag op. Positioneer nu de plank voor de bovenkant van het hotel.");
                    pickup({
                        el: plank6,
                        posHand: ["0.6 0 -1","0 0 0","0.5 0.03125 0.125"],
                        posHitbox: ["0 0 0", "0 0 0", "1.1 1.1 1.1"],
                        selectors: [
                            {
                                selector: document.getElementById("js--plankselect6"),
                                posSelect: ["0 9.75 0","0 0 0","8 0.5 2"],
                                selectHitbox: ["0 0 0", "0 0 0", "1.1 1.1 1.1"],
                                func: function(el) {
                                    document.getElementById("js--stap9").setAttribute("visible", "false");
                                    document.getElementById("js--stap10").setAttribute("visible", "true");
                                    document.getElementById("js--stap101").setAttribute("visible", "true");
                                    instructie.setAttribute("value", "10. Pak de hamer. Sla nu aan beide bovenkanten er een spijker in.");
                                    setTimeout(function() {klik.disable(el.children[0]);}, 1010);
                                    let spijkers = document.getElementsByClassName("spijker");
                                    for(let i = 4; i < 6; i++) {
                                        spijkers[i].setAttribute("visible","true");
                                    }
                                }
                            }
                        ]
                    });
                }
            }
        ],
        geluid: "378697"
    });

    gereedschap({
        el: document.getElementById("js--hamer"),
        posHand: ["0.23 -0.07 -0.6","85 5 -90","0.3 0.3 0.3"],
        posHitbox: ["-0.18 0.6 0.6","0 0 0","0.7 0.25 1.3"],
        elmuur: document.getElementById("js--hamermuur"),
        posMuur: ["0.19 0.2 0.5","90 -90 0","0.4 0.4 0.4"], //position rotation scale
        acties: [
            {
                selector: document.getElementById("js--spijkerselect0"),
                posBezig: ["-2.25 -3.15 0","0 0 0","6 6 6"],
                selectHitbox: ["0 0 0", "0 0 0", "1.1 1.1 1.1"],
                func: function() {
                    document.getElementById("js--stap3").setAttribute("visible", "true");
                    document.getElementById("js--stap2").setAttribute("visible", "false");
                    document.getElementById("js--spijker").setAttribute("position","-3.3 0.25 0");
                    instructie.setAttribute("value", "3. Hang de hamer op. Pak nu de 50cm plank voor de rechterkant op en zet deze op de goede plek.");
                    pickup({
                        el: document.getElementById("js--plank4"),
                        posHand: ["0.6 0 -1","0 0 90","0.625 0.03125 0.125"],
                        posHitbox: ["0 0 0", "0 0 0", "1.1 1.1 1.1"],
                        selectors: [
                            {
                                selector: document.getElementById("js--plankselect4"),
                                posSelect: ["4.25 5 0","0 0 90","10 0.5 2"],
                                selectHitbox: ["0 0 0", "0 0 0", "1.1 1.1 1.1"],
                                func: function(el) {
                                    document.getElementById("js--stap4").setAttribute("visible", "true");
                                    document.getElementById("js--stap3").setAttribute("visible", "false");
                                    instructie.setAttribute("value", "4. Pak de hamer weer op en sla ook hier een spijker erin, zodat de planken aan elkaar vast zitten.");
                                    document.getElementsByClassName("spijker")[1].setAttribute("visible","true");
                                    setTimeout(function() {klik.disable(el.children[0]);}, 1010);
                                }
                            }
                        ]
                    });
                }
            },
            {
                selector: document.getElementById("js--spijkerselect1"),
                posBezig: ["-2.25 -3.15 0","0 0 0","6 6 6"],
                selectHitbox: ["0 0 0", "0 0 0", "1.1 1.1 1.1"],
                func: function() {
                    document.getElementById("js--stap5").setAttribute("visible", "true");
                    document.getElementById("js--stap4").setAttribute("visible", "false");
                    document.getElementById("js--spijker1").setAttribute("position","3.3 0.25 0");
                    instructie.setAttribute("value", "5. Hang de hamer op en pak de zaag. Zaag nu 30cm van een 50cm plank af voor het scheiden van het hotel in 2 delen.");
                    document.getElementsByClassName("zaagpos")[0].setAttribute("visible","true");
                }
            },
            {
                selector: document.getElementById("js--spijkerselect2"),
                posBezig: ["-2.25 -3.15 0","0 0 0","6 6 6"],
                selectHitbox: ["0 0 0", "0 0 0", "1.1 1.1 1.1"],
                func: function() {
                    document.getElementById("js--spijker2").setAttribute("position","-3.3 5 0");
                    document.getElementById("js--stap71").setAttribute("visible", "false");
                    if(document.getElementById("js--spijker3").getAttribute("position").x == 3.3) {
                        document.getElementById("js--stap8").setAttribute("visible", "true");
                        instructie.setAttribute("value", "8. Hang de hamer weer op en pak de zaag. Zaag nu 30cm van een 50cm plank af voor de bovenkant van het hotel.");
                        document.getElementsByClassName("zaagpos")[2].setAttribute("visible","true");
                    }
                }
            },
            {
                selector: document.getElementById("js--spijkerselect3"),
                posBezig: ["-2.25 -3.15 0","0 0 0","6 6 6"],
                selectHitbox: ["0 0 0", "0 0 0", "1.1 1.1 1.1"],
                func: function() {
                    document.getElementById("js--stap7").setAttribute("visible", "false");
                    document.getElementById("js--spijker3").setAttribute("position","3.3 5 0");
                    if(document.getElementById("js--spijker2").getAttribute("position").x == -3.3) {
                        document.getElementById("js--stap8").setAttribute("visible", "true");
                        instructie.setAttribute("value", "8. Hang de hamer weer op en pak de zaag. Zaag nu 30cm van een 50cm plank af voor de bovenkant van het hotel.");
                        document.getElementsByClassName("zaagpos")[2].setAttribute("visible","true");
                    }
                }
            },
            {
                selector: document.getElementById("js--spijkerselect4"),
                posBezig: ["-2.25 -3.15 0","0 0 0","6 6 6"],
                selectHitbox: ["0 0 0", "0 0 0", "1.1 1.1 1.1"],
                func: function() {
                    document.getElementById("js--stap101").setAttribute("visible", "false");
                    document.getElementById("js--spijker4").setAttribute("position","-3.3 9.75 0");
                    if(document.getElementById("js--spijker5").getAttribute("position").x == 3.3) {
                        document.getElementById("js--stap11").setAttribute("visible", "true");
                        instructie.setAttribute("value", "11. Pak de zaag. Zaag nu 25cm van een 50cm plank af voor het scheiden van het bovenste gedeelte van het hotel.");
                        document.getElementsByClassName("zaagpos")[1].setAttribute("visible","true");
                    }
                }
            },
            {
                selector: document.getElementById("js--spijkerselect5"),
                posBezig: ["-2.25 -3.15 0","0 0 0","6 6 6"],
                selectHitbox: ["0 0 0", "0 0 0", "1.1 1.1 1.1"],
                func: function() {

                    document.getElementById("js--stap10").setAttribute("visible", "false");
                    document.getElementById("js--spijker5").setAttribute("position","3.3 9.75 0");
                    if(document.getElementById("js--spijker4").getAttribute("position").x == -3.3) {
                        document.getElementById("js--stap11").setAttribute("visible", "true");
                        instructie.setAttribute("value", "11. Pak de zaag. Zaag nu 25cm van een 50cm plank af voor het scheiden van het bovenste gedeelte van het hotel.");
                        document.getElementsByClassName("zaagpos")[1].setAttribute("visible","true");
                    }
                }
            }
        ],
        geluid: "378684"
    });

    gereedschap({
        el: document.getElementById("js--kniptang"),
        posHand: ["0.2 -0.2 -0.4","0 40 0","0.2 0.2 0.2"],
        posHitbox: ["-0.03 0.3 -0.3","0 0 0","0.21 1.9 1"],
        elmuur: document.getElementById("js--kniptangmuur"),
        posMuur: ["-0.025 -0.1 -0.5","0 0 0","0.25 0.25 0.25"], //position rotation scale
        acties: [
            {
                selector: document.getElementById("js--kniptangselect"),
                posBezig: ["0 0 0","90 45 -90","0.2 0.2 0.2"],
                selectHitbox: ["0 0 0", "0 0 0", "1.1 1.1 1.1"],
                func: function() {
                    document.getElementById("js--stap12").setAttribute("visible", "false");
                    var gaas = document.getElementById("js--gaas");
                    gaas.removeChild(gaas.children[8]);
                    gaas.removeChild(gaas.children[8]);
                    gaas.removeChild(gaas.children[8]);
                    changePos(gaas.children[0], ["0.25 0.01 0.25","0 0 0","0.02 0.02 0.5"]);
                    changePos(gaas.children[1], ["0.15 0.01 0.25","0 0 0","0.02 0.02 0.5"]);
                    changePos(gaas.children[2], ["0.05 0.01 0.25","0 0 0","0.02 0.02 0.5"]);
                    document.getElementById("js--stap14").setAttribute("visible", "true");
                    document.getElementById("js--stap13").setAttribute("visible", "false");
                    instructie.setAttribute("value", "14. Hang de kniptang op. Positioneer nu het gaas op de goede plek.");
                    pickup({
                        el: gaas,
                        posHand: ["0.6 0 -1","0 -90 -90","1 1 1"],
                        posHitbox: ["0.15 0.01 0.25","0 0 0","0.301 0.021 0.501"],
                        selectors: [
                            {
                                selector: document.getElementById("js--kniptangselect2"),
                                posSelect: ["-4 0.225 0.6","0 90 90","16 16 16"],
                                selectHitbox: ["0 0 0", "0 0 0", "1.1 1.1 1.1"],
                                func: function(el) {
                                    setTimeout(function() {klik.disable(el.children[8]);}, 1010);
                                    watmoetjedoen.setAttribute("visible", "false");
                                    document.getElementById("js--stap14").setAttribute("visible", "false");
                                    instructie.setAttribute("value", "Nu is het tijd om het hotel te vullen. Het insect dat bij jouw in de buurt leeft, staat op het bord hier links. Zoek welk materiaal het beste is voor het insect en stop dit in het hotel. Als je het hotel hebt gevuld, zet de achterplaat van 50 bij 30cm ertegenaan en schroef deze in elke hoek vast. Het insectenhotel is nu klaar! Veel plezier ermee!");
                                    instructie.setAttribute("geometry", "height: 10");
                                    instructie.setAttribute("width", "6");
                                    instructie.setAttribute("position", "0 0.5 0.001");
                                    apiinsect.setAttribute("visible", "true");
                                }
                            }
                        ]
                    });
                },

            }
        ],
        geluid: "410911"
    });



};

async function getfreesound(number, key = "9AasN1nnnATI4cnsNIeQf5aASFnHNueIgRY43qyq") {
    const url = "https://freesound.org/apiv2/sounds/" + number + "/?format=json&token=" + key;
    const response = await fetch(url);
    const json = await response.json();
    const soundurl = await json.previews["preview-hq-mp3"];
    return soundurl;
}

var lat, lon;
function getCoords() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

async function getINaturalist(lat, lon) {
    if(lat == null || lon == null) {
        lat = 52.23002349;
        lon = 4.4425522;
    }
    const url = "https://cors-anywhere.herokuapp.com/https://api.inaturalist.org/v1/observations?photos=true&iconic_taxa=Insecta&lat=" + lat + "&lng=" + lon + "&radius=2&order=desc&order_by=created_at";
    const response = await fetch(url);
    const json = await response.json();
    const imgurl = await json.results[0].taxon.default_photo.medium_url;
    const name = await json.results[0].taxon.name;
    await apiinsect.setAttribute("value",name);
    await apiinsect.children[0].setAttribute("src","url(https://cors-anywhere.herokuapp.com/" + imgurl + ")");
}

AFRAME.registerComponent("tp", {
    schema: {
        duration: {type: "int", default: 3000}
    },

    init: function () {
        var klik = new VRClick();
        var element = this.el;
        var data = this.data;

        element.setAttribute("radius","0.2");
        element.setAttribute("height","0.01");
        element.setAttribute("color","#000000");
        element.setAttribute("geometry","segmentsRadial: 12; segmentsHeight: 1");
        element.object3D.position.y = 0.005;

        klik.enable(element, function() {
            camera.setAttribute(
                "animation",
                "property: position;" +
                "dur: " + data.duration + ";" +
                "easing: easeInOutSine;" +
                "loop: 1;" +
                "to: " + element.object3D.position.x + " 0 " + element.object3D.position.z + ";"
            );
        });
    }
});

function changePos(el, lijst) {
    el.setAttribute("position", lijst[0]);
    el.setAttribute("rotation", lijst[1]);
    el.setAttribute("scale", lijst[2]);
}

function pickup({el, posHand, posHitbox, selectors, isgereedschap = false}) {

    // Create main element hitbox
    var hitbox = document.createElement("a-entity");
    el.appendChild(hitbox);
    setTimeout(function() {
        hitbox.setAttribute("geometry", "primitive: box");
        hitbox.setAttribute("material", "color: white");
        hitbox.setAttribute("material", "alphaTest: 1");
        hitbox.setAttribute("class", "hitbox");
        changePos(hitbox, posHitbox);
    }, 10);

    selectors.forEach(i => {
        let selhitbox = document.createElement("a-entity");
        i.selector.appendChild(selhitbox);

        setTimeout(function() {
            selhitbox.setAttribute("geometry", "primitive: box");
            selhitbox.setAttribute("material", "color: white");
            selhitbox.setAttribute("material", "alphaTest: 1");
            changePos(selhitbox, i.selectHitbox);
        }, 10);
    });

    // Enable clicking on main element
    klik.enable(hitbox, function() {

        // Set variable to make inventory full
        player.holding = 1;
        setTimeout(function() {
            klik.disable(document.getElementById("js--zaag").getElementsByClassName("hitbox")[0]);
            klik.disable(document.getElementById("js--hamer").getElementsByClassName("hitbox")[0]);
            klik.disable(document.getElementById("js--kniptang").getElementsByClassName("hitbox")[0]);
        }, 10);

        // Disable clicking on main element
        klik.disable(hitbox);

        // After clicking add element to player
        player.appendChild(el);
        setTimeout(function() {
            changePos(el, posHand);
        }, 10);

        // Enable all selectors
        selectors.forEach(i => {

            // Abort pending actions
            if(typeof i.abort === "function") {
                i.abort(el, i);
            }

            // set selector to visible
            if(i.selector.klaar == null){i.selector.klaar = false;}
            i.selector.setAttribute("visible",!i.selector.klaar);

            // enable click for selector
            klik.enable(i.selector.children[0], function() {

                // when clicked disable all selectors
                selectors.forEach(j => {
                    klik.disable(j.selector.children[0]);
                    j.selector.setAttribute("visible","false");
                });

                // set element to selector
                i.selector.parentNode.appendChild(el);
                setTimeout(function() {
                    changePos(el, i.posSelect);
                }, 10);

                // when function is found, execute
                if(typeof i.func === "function") {

                    i.func(el, i);

                }

                if(isgereedschap == true) {
                    if (typeof i.muur !== "undefined") {
                        player.holding = 0;
                    }
                } else {
                    player.holding = 0;
                }

                setTimeout(function() {
                    klik.enable(hitbox);
                }, 500);

                if(player.holding == 0) {
                    // enable main element after 1000 ms
                    setTimeout(function() {

                        klik.enable(document.getElementById("js--zaag").getElementsByClassName("hitbox")[0]);
                        klik.enable(document.getElementById("js--hamer").getElementsByClassName("hitbox")[0]);
                        klik.enable(document.getElementById("js--kniptang").getElementsByClassName("hitbox")[0]);
                    }, 500);
                }

            });
        });
    });
}

function gereedschap({el, elmuur, posMuur, posHand, acties, geluid, posHitbox}) {

    if(geluid > 0) {getfreesound(geluid).then(url => {
        var audio = document.createElement("audio");
        audio.setAttribute("src",url);
        audio.setAttribute("id",geluid);
        document.getElementsByTagName("a-assets")[0].appendChild(audio);
        el.setAttribute("sound", { src: "#" + geluid});
    });}

    var selectors = [{
        selector: elmuur,
        posSelect: posMuur,
        selectHitbox: posHitbox,
        func: function(el, i) {
            gereedschapsrek.appendChild(el);
            changePos(el, i.posSelect);
            setTimeout(function() {
                klik.enable(el.children[0]);
            }, 1000);
        },
        muur: true
    }];

    acties.forEach(actie => {
        selectors.push({
            selector: actie.selector,
            posSelect: actie.posBezig,
            selectHitbox: actie.selectHitbox,
            func: function(el, i) {
                setTimeout(function() {
                    el.emit("bezigstart");
                    if(geluid > 0) {
                        el.components.sound.playSound();
                    }
                }, 10);

                i.selector.bezig = setTimeout(function() {
                    actie.func();

                    i.selector.klaar = true;
                    i.selector.bezig = null;

                    el.children[0].emit("click");
                }, 8000);
            },
            abort: function(el, i) {
                if(i.selector.bezig != null) {
                    clearTimeout(i.selector.bezig);
                    i.selector.bezig = null;
                }
            }
        });
    });

    pickup({
        el: el,
        posHand: posHand,
        posHitbox: posHitbox,
        selectors: selectors,
        isgereedschap: true
    });

}

class VRClick {

    onClickHandler(evt) {
        cursor.setAttribute("property.thetaLength", "360");
        cursor.setAttribute("animation","property.thetaLength: geometry; dur: 10; to: 360");
        evt.target.func();
    }

    onMouseLeaveHandler() {
        cursor.setAttribute("property.thetaLength", "360");
        cursor.setAttribute("animation","property.thetaLength: geometry; dur: 10; to: 360");
    }

    onFusingHandler() {
        cursor.setAttribute("animation","property: geometry.thetaLength; easing: easeOutSine; dur: 1500; to: 0");
    }

    enable(element, func = element.func) {
        element.addEventListener("click", this.onClickHandler);
        element.func = func;
        element.addEventListener("mouseleave", this.onMouseLeaveHandler);
        element.addEventListener("fusing", this.onFusingHandler);
    }

    disable(element) {
        element.removeEventListener("click", this.onClickHandler);
        element.removeEventListener("mouseleave", this.onMouseLeaveHandler);
        element.removeEventListener("fusing", this.onFusingHandler);
    }
}

var klik = new VRClick;
