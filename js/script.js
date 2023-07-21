function render_main() {
  load_nodes(g.nodes);
  let text = "";

  for (let idx in data) {
    let el = data[idx];
    var p = el.products;

    text += /*html*/ `   
    <div class="c_products" style="flex-direction: column">
     <div class="c_1"> 
      <div class="c_category">
       <div class="category">
         ${std.ensure(el, KEY.NAME, "")}
       </div>
         ${ensureProduct(p)}
        <div class="c_2"> 
          <img src="${std.ensure(el, KEY.IMAGE, "")}" />
        </div>
      </div> 
    <div class="title_toppings c_category">
      <p> ${std.ensure(el, KEY.EXTRA_TOPPINGS_NAME, '')} </p>
        <div class="c_extra_toppings">
           ${ensureExtraToppings(el.extra_toppings)}
        </div>
        </div> 
      </div> 
    </div>
    `;

  }
  g.nodes.main.nodes.html(text);
}

function load_nodes(nodes) {
  for (var node_nm in nodes) reassign_node(nodes[node_nm]);
}

function reassign_node(vt_node) {
  vt_node.nodes = $(vt_node.selector);
  vt_node.str_node = vt_node.selector.replace(REGEX.ENSURE_STR_NODE, "");

  if (vt_node.nodes.length == 0) {
    console.log(`o node ${vt_node.selector}não existe`);
    return;
  }
  if (std.is_null(vt_node.events)) {
    return;
  } else {
    for (var ev_nm in vt_node.events) {
      var ev = vt_node.events[ev_nm];
      vt_node.nodes.each((i, el) => $(el).on(ev_nm, ev));
    }
  }
}

function replaceAndFindParentheses(text) {
  var r2 = null;
  var r1 = text.replace(REGEX.FIND_PARENTHESES, (a) => {
    r2 = a; ''
    return "";
  });
  return { name: r1, obs: r2 };
}


function replaceDotsWithCommas(texto) {
  const textoComVirgulas = texto.replace(/\./g, ',');
  return textoComVirgulas;
}

function ensureProduct(p) {
  let text = ""
  for (let idx in p) {
    let el = p[idx];
    var r = replaceAndFindParentheses(std.ensure(el, KEY.NAME, ""));

    text += /*html*/ `
    <div class="product"> 
      <div class="flex-direction-column w-70">
        <div class="c-1"> 
          <p> ${r.name} ${!std.is_null(r.obs) ? /*html*/ ` <span>${r.obs} </span>` : ""}</p>
     
        <div class="money">R$ ${replaceDotsWithCommas(std.ensure(el, KEY.VALUE, 0).toFixed(2))} </div>  
      </div>
       <div class="c-2">
         ${std.ensure(el, KEY.SIZE, "")}
       </div>
      </div>
    </div>
  
    `;
  }
  return text;
}

function ensureExtraToppings(t_2) {
  let text = ""
  for (let idx in t_2) {
    let el = t_2[idx];
    var r = replaceAndFindParentheses(std.ensure(el, KEY.NAME, ""));

    text += /*html*/ `
      <div class="extra_toppings">+${r.name} ${!std.is_null(r.obs) ? /*html*/ `<span>${r.obs}</span>` : ""
      } - R$${replaceDotsWithCommas(
        std
          .ensure(el, KEY.VALUE_ADD, 0)
          .toFixed(2))}
      </div> 

    `;
  }
  return text;
}
/* 
function showNode(x) {

  let offset = x > g.card_on ? -50 : +50;
  let y = g.cards[x];
  let a = g.cards[g.card_on];
  let on = g.nodes[a].nodes, off = g.nodes[y].nodes;

  on.hide();
  off.show();

  off.css(CSS_PROPERTY_NAME.LEFT, offset + SIZE.VW);
  off.animate({ left: 0 }, {
    duration: 800
  });

  g.card_on = x;
}; */
