import './ButtonWheel.css.proxy.js';
/* src/components/ButtonWheel.svelte generated by Svelte v3.29.0 */
import {
	SvelteComponent,
	append,
	attr,
	destroy_each,
	detach,
	element,
	init,
	insert,
	noop,
	safe_not_equal,
	set_style,
	space,
	text
} from "../../web_modules/svelte/internal.js";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[2] = list[i];
	child_ctx[4] = i;
	return child_ctx;
}

// (50:2) {#each { length: count } as _, i}
function create_each_block(ctx) {
	let div1;
	let div0;
	let t0;
	let t1;
	let t2;

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
			t0 = text("I am ");
			t1 = text(/*i*/ ctx[4]);
			t2 = space();
			attr(div0, "class", "ActiveButton svelte-18tb1ts");
			set_style(div0, "transform", "skew(" + (-90 + /*central*/ ctx[1]) + "deg) rotate(" + -1 * (90 - /*central*/ ctx[1] / 2) + "deg)");
			attr(div1, "class", "Button svelte-18tb1ts");
			set_style(div1, "transform", "rotate(" + (90 - /*central*/ ctx[1] / 2 + /*i*/ ctx[4] * /*central*/ ctx[1]) + "deg) skew(" + (90 - /*central*/ ctx[1]) + "deg)");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
			append(div0, t0);
			append(div0, t1);
			append(div1, t2);
		},
		p(ctx, dirty) {
			if (dirty & /*central*/ 2) {
				set_style(div0, "transform", "skew(" + (-90 + /*central*/ ctx[1]) + "deg) rotate(" + -1 * (90 - /*central*/ ctx[1] / 2) + "deg)");
			}

			if (dirty & /*central*/ 2) {
				set_style(div1, "transform", "rotate(" + (90 - /*central*/ ctx[1] / 2 + /*i*/ ctx[4] * /*central*/ ctx[1]) + "deg) skew(" + (90 - /*central*/ ctx[1]) + "deg)");
			}
		},
		d(detaching) {
			if (detaching) detach(div1);
		}
	};
}

function create_fragment(ctx) {
	let div;
	let each_value = { length: count };
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	return {
		c() {
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(div, "class", "ColorWheel svelte-18tb1ts");
			set_style(div, "top", /*point*/ ctx[0].pageY - radius / 2 + "px");
			set_style(div, "left", /*point*/ ctx[0].pageX - radius / 2 + "px");
		},
		m(target, anchor) {
			insert(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*central*/ 2) {
				each_value = { length: count };
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (dirty & /*point*/ 1) {
				set_style(div, "top", /*point*/ ctx[0].pageY - radius / 2 + "px");
			}

			if (dirty & /*point*/ 1) {
				set_style(div, "left", /*point*/ ctx[0].pageX - radius / 2 + "px");
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			destroy_each(each_blocks, detaching);
		}
	};
}

const radius = 400;
let count = 8;

function instance($$self, $$props, $$invalidate) {
	
	let { point } = $$props;

	$$self.$$set = $$props => {
		if ("point" in $$props) $$invalidate(0, point = $$props.point);
	};

	let central;
	$: $$invalidate(1, central = 360 / count);
	return [point, central];
}

class ButtonWheel extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { point: 0 });
	}
}

export default ButtonWheel;