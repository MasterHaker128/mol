require( "source-map-support" ).install()

;
"use strict"
/// Fake namespace for optional overrides
///
/// 	namespace $ { export var x = 1 , y = 1 } // defaults
/// 	namespace $.$$ { export var x = 2 } // overrides
/// 	namespace $.$$ { console.log( x , y ) } // usage
///
this.$ = this.$ || this
var $ = this.$
$.$$ = $

$.$mol = $  // deprecated

;
"use strict";
var $;
(function ($) {
    function $mol_log(path, ...values) {
        if ($.$mol_log_filter() == null)
            return;
        path = String(path);
        if (path.indexOf($.$mol_log_filter()) === -1)
            return;
        if ($.$mol_log_context())
            $.$mol_log_context()();
        console.debug(path, ...values);
        if ($.$mol_log_debug() == null)
            return;
        if (path.indexOf($.$mol_log_debug()) === -1)
            return;
        debugger;
    }
    $.$mol_log = $mol_log;
})($ || ($ = {}));
//log.js.map
;
"use strict";
var $;
(function ($) {
    let context = null;
    function $mol_log_context(next = context) {
        return context = next;
    }
    $.$mol_log_context = $mol_log_context;
})($ || ($ = {}));
//log_context.js.map
;
"use strict";
var $;
(function ($) {
    let debug;
    function $mol_log_debug(next = debug) {
        return debug = next;
    }
    $.$mol_log_debug = $mol_log_debug;
})($ || ($ = {}));
//log_debug.node.js.map
;
"use strict";
var $;
(function ($) {
    let filter;
    function $mol_log_filter(next = filter) {
        return filter = next;
    }
    $.$mol_log_filter = $mol_log_filter;
})($ || ($ = {}));
//log_filter.node.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_log_group(name, task) {
        return function $mol_log_group_wrapper(...args) {
            const filter = $.$mol_log_filter();
            if (filter == null)
                return task.apply(this, args);
            let started = false;
            let prev = $.$mol_log_context();
            $.$mol_log_context(() => {
                if (prev)
                    prev();
                started = true;
                if (filter)
                    console.group(name);
                else
                    console.groupCollapsed(name);
                $.$mol_log_context(prev = null);
            });
            try {
                return task.apply(this, args);
            }
            finally {
                if (started)
                    console.groupEnd();
                $.$mol_log_context(prev);
            }
        };
    }
    $.$mol_log_group = $mol_log_group;
})($ || ($ = {}));
//log_group.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_test(set) {
        for (let name in set)
            $.$mol_test_all.push(new $mol_test_case(set[name]));
        $mol_test_schedule();
    }
    $.$mol_test = $mol_test;
    $.$mol_test_all = [];
    $.$mol_test_run = () => {
        for (var test of $.$mol_test_all) {
            test.run();
        }
    };
    class $mol_test_case {
        constructor(code) {
            if (typeof code === 'string') {
                this.code = new Function(code);
            }
            else {
                this.code = code;
            }
        }
        run() {
            this.code();
        }
    }
    $.$mol_test_case = $mol_test_case;
    let scheduled = false;
    function $mol_test_schedule() {
        if (scheduled)
            return;
        scheduled = true;
        setTimeout($.$mol_log_group('$mol_test.run()', () => {
            scheduled = false;
            $.$mol_test_run();
        }));
    }
    $.$mol_test_schedule = $mol_test_schedule;
})($ || ($ = {}));
//test.test.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_test({
        'must be false'() {
            $.$mol_assert_not(0);
        },
        'must be true'() {
            $.$mol_assert_ok(1);
        },
        'two must be equal'() {
            $.$mol_assert_equal(2, 2);
        },
        'three must be equal'() {
            $.$mol_assert_equal(2, 2, 2);
        },
        'two must be unique'() {
            $.$mol_assert_unique([3], [3]);
        },
        'three must be unique'() {
            $.$mol_assert_unique([3], [3], [3]);
        },
    });
})($ || ($ = {}));
//assert.test.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_assert_ok(value) {
        if (value)
            return;
        throw new Error(`Not true (${value})`);
    }
    $.$mol_assert_ok = $mol_assert_ok;
    function $mol_assert_not(value) {
        if (!value)
            return;
        throw new Error(`Not false (${value})`);
    }
    $.$mol_assert_not = $mol_assert_not;
    function $mol_assert_fail(handler, ErrorRight) {
        try {
            handler();
        }
        catch (error) {
            if (ErrorRight)
                if (!(error instanceof ErrorRight))
                    throw error;
            return error;
        }
        throw new Error('Not failed');
    }
    $.$mol_assert_fail = $mol_assert_fail;
    function $mol_assert_equal(...args) {
        for (let i = 0; i < args.length; ++i) {
            for (let j = 0; j < args.length; ++j) {
                if (i === j)
                    continue;
                if (args[i] !== args[j])
                    throw new Error(`Not equal (${args[i]}!==${args[j]})`);
            }
        }
    }
    $.$mol_assert_equal = $mol_assert_equal;
    function $mol_assert_unique(...args) {
        for (let i = 0; i < args.length; ++i) {
            for (let j = 0; j < args.length; ++j) {
                if (i === j)
                    continue;
                if (args[i] === args[j])
                    throw new Error(`Not unique (args[${i}]===args[${j}])===${args[i]}`);
            }
        }
    }
    $.$mol_assert_unique = $mol_assert_unique;
})($ || ($ = {}));
//assert.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_func_name_dict = new WeakMap();
    function $mol_func_name(func) {
        let name = $.$mol_func_name_dict.get(func);
        if (name != null)
            return name;
        name = func.name || Function.prototype.toString.call(func).match(/^function ([a-z0-9_$]*)/)[1];
        $.$mol_func_name_dict.set(func, name);
        return name;
    }
    $.$mol_func_name = $mol_func_name;
})($ || ($ = {}));
//name.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_test({
        'init with overload'() {
            class X extends $.$mol_object {
                foo() {
                    return 1;
                }
            }
            var x = X.make({
                foo: () => 2,
            });
            $.$mol_assert_equal(x.foo(), 2);
        },
    });
})($ || ($ = {}));
//object.test.js.map
;
"use strict";
var $;
(function ($_1) {
    let $$;
    (function ($$) {
        let $;
    })($$ = $_1.$$ || ($_1.$$ = {}));
    class $mol_object {
        get $() {
            const owner = this.object_owner();
            return (owner && owner.$ || $);
        }
        static make(config) {
            const instance = new this;
            for (let key in config)
                instance[key] = config[key];
            return instance;
        }
        static toString() {
            return $_1.$mol_func_name(this);
        }
        object_owner(next) {
            return this['object_owner()'] || (this['object_owner()'] = next);
        }
        object_host(next) {
            return this['object_host()'] || (this['object_host()'] = next);
        }
        object_field(next) {
            return this['object_field()'] || (this['object_field()'] = next) || '';
        }
        object_id(next) {
            return this['object_id()'] || (this['object_id()'] = next) || '';
        }
        toString() {
            return this.object_id();
        }
        toJSON() {
            return this.toString();
        }
        destructor() { }
    }
    $_1.$mol_object = $mol_object;
})($ || ($ = {}));
//object.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_defer extends $.$mol_object {
        constructor(run) {
            super();
            this.run = run;
            $mol_defer.add(this);
        }
        destructor() {
            $mol_defer.drop(this);
        }
        static schedule() {
            if (this.timer)
                return;
            this.timer = this.scheduleNative(() => {
                this.timer = 0;
                this.run();
            });
        }
        static unschedule() {
            if (!this.timer)
                return;
            cancelAnimationFrame(this.timer);
            this.timer = 0;
        }
        static add(defer) {
            this.all.push(defer);
            this.schedule();
        }
        static drop(defer) {
            var index = this.all.indexOf(defer);
            if (index >= 0)
                this.all.splice(index, 1);
        }
        static run() {
            if (this.all.length === 0)
                return;
            this.schedule();
            for (var defer; defer = this.all.shift();)
                defer.run();
        }
    }
    $mol_defer.all = [];
    $mol_defer.timer = 0;
    $mol_defer.scheduleNative = (typeof requestAnimationFrame == 'function')
        ? handler => requestAnimationFrame(handler)
        : handler => setTimeout(handler, 16);
    $.$mol_defer = $mol_defer;
})($ || ($ = {}));
//defer.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_test({
        'return source when same object'() {
            const target = {};
            $.$mol_assert_equal($.$mol_conform(target, target), target);
        },
        'return target when some is not object'() {
            const obj = { a: 1 };
            $.$mol_assert_equal($.$mol_conform(true, obj), true);
            $.$mol_assert_equal($.$mol_conform(obj, true), obj);
        },
        'return target when some is null'() {
            const obj = { a: 1 };
            $.$mol_assert_equal($.$mol_conform(null, obj), null);
            $.$mol_assert_equal($.$mol_conform(obj, null), obj);
        },
        'return target when some is undefined'() {
            const obj = { a: 1 };
            $.$mol_assert_equal($.$mol_conform(undefined, obj), undefined);
            $.$mol_assert_equal($.$mol_conform(obj, undefined), obj);
        },
        'return target when different keys count'() {
            const target = [1, 2, 3];
            const source = [1, 2, 3, undefined];
            const result = $.$mol_conform(target, source);
            $.$mol_assert_equal(result, target);
            $.$mol_assert_equal(result.join(','), '1,2,3');
        },
        'return source when array values are strong equal'() {
            const source = [1, 2, 3];
            $.$mol_assert_equal($.$mol_conform([1, 2, 3], source), source);
        },
        'return source when object values are strong equal'() {
            const source = { a: 1, b: 2 };
            $.$mol_assert_equal($.$mol_conform({ a: 1, b: 2 }, source), source);
        },
        'return target when some values are not equal'() {
            const target = [1, 2, 3];
            const source = [1, 2, 5];
            const result = $.$mol_conform(target, source);
            $.$mol_assert_equal(result, target);
            $.$mol_assert_equal(result.join(','), '1,2,3');
        },
        'return source when values are deep equal'() {
            const source = [1, [2, [3]]];
            $.$mol_assert_equal($.$mol_conform([1, [2, [3]]], source), source);
        },
        'return target with equal values from source and not equal from target'() {
            const source = [[1], [2]];
            const target = [[1], [3]];
            const result = $.$mol_conform(target, source);
            $.$mol_assert_equal(result, target);
            $.$mol_assert_equal(result[0], source[0]);
            $.$mol_assert_equal(result[1], target[1]);
        },
        'return target when equal but with different class'() {
            const target = { '0': 1 };
            $.$mol_assert_equal($.$mol_conform(target, [1]), target);
        },
        'return target when conformer for class is not defined'() {
            const Obj = class {
            };
            const source = new Obj;
            const target = new Obj;
            const result = $.$mol_conform(target, source);
            $.$mol_assert_equal(result, target);
        },
        'return target when has cyclic reference'() {
            const source = { foo: {} };
            source['self'] = source;
            const target = { foo: {} };
            target['self'] = target;
            const result = $.$mol_conform(target, source);
            $.$mol_assert_equal(result, target);
            $.$mol_assert_equal(result['self'], target);
            $.$mol_assert_equal(result.foo, source.foo);
        },
        'return source when equal dates'() {
            const source = new Date(12345);
            const target = new Date(12345);
            const result = $.$mol_conform(target, source);
            $.$mol_assert_equal(result, source);
        },
        'return source when equal regular expressions'() {
            const source = /\x22/mig;
            const target = /\x22/mig;
            const result = $.$mol_conform(target, source);
            $.$mol_assert_equal(result, source);
        },
        'return cached value if already conformed'() {
            const source = [[1], [3]];
            const target = [[2], [3]];
            const result = $.$mol_conform(target, source);
            target[0][0] = 1;
            $.$mol_assert_equal($.$mol_conform(target[0], source[0]), target[0]);
        },
    });
})($ || ($ = {}));
//conform.test.js.map
;
"use strict";
var $;
(function ($) {
    const cache = new WeakMap();
    function $mol_conform(target, source, stack = []) {
        if (target === source)
            return source;
        if (!target || typeof target !== 'object')
            return target;
        if (!source || typeof source !== 'object')
            return target;
        if (target instanceof Error)
            return target;
        if (source instanceof Error)
            return target;
        if (target.constructor !== source.constructor)
            return target;
        if (cache.get(target))
            return target;
        cache.set(target, true);
        const conform = $.$mol_conform_handlers.get(target.constructor);
        if (!conform)
            return target;
        if (stack.indexOf(target) !== -1)
            return target;
        stack.push(target);
        const res = conform(target, source, stack);
        stack.pop();
        return res;
    }
    $.$mol_conform = $mol_conform;
    $.$mol_conform_handlers = new WeakMap();
    function $mol_conform_handler(cl, handler) {
        $.$mol_conform_handlers.set(cl, handler);
    }
    $.$mol_conform_handler = $mol_conform_handler;
    $mol_conform_handler(Array, (target, source, stack) => {
        let equal = target.length === source.length;
        for (let i = 0; i < target.length; ++i) {
            const conformed = target[i] = $mol_conform(target[i], source[i], stack);
            if (equal && conformed !== source[i])
                equal = false;
        }
        return equal ? source : target;
    });
    $mol_conform_handler(Object, (target, source, stack) => {
        let count = 0;
        let equal = true;
        for (let key in target) {
            const conformed = target[key] = $mol_conform(target[key], source[key], stack);
            if (equal && conformed !== source[key])
                equal = false;
            ++count;
        }
        for (let key in source)
            if (--count < 0)
                break;
        return (equal && count === 0) ? source : target;
    });
    $mol_conform_handler(Date, (target, source) => (target.getTime() === source.getTime()) ? source : target);
    $mol_conform_handler(RegExp, (target, source) => (target.toString() === source.toString()) ? source : target);
})($ || ($ = {}));
//conform.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_state_stack = new Map();
})($ || ($ = {}));
//stack.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_test({
        'caching'() {
            let random = new $.$mol_atom('random', () => Math.random());
            $.$mol_assert_equal(random.get(), random.get());
        },
        'lazyness'() {
            let value = 0;
            let prop = new $.$mol_atom('prop', () => value = 1);
            $.$mol_defer.run();
            $.$mol_assert_equal(value, 0);
        },
        'instant actualization'() {
            let source = new $.$mol_atom('source', (next) => next || 1);
            let middle = new $.$mol_atom('middle', () => source.get() + 1);
            let target = new $.$mol_atom('target', () => middle.get() + 1);
            $.$mol_assert_equal(target.get(), 3);
            source.set(2);
            $.$mol_assert_equal(target.get(), 4);
        },
        'do not actualize when masters not changed'() {
            let target_updates = 0;
            let source = new $.$mol_atom('source', (next) => next || 1);
            let middle = new $.$mol_atom('middle', () => Math.abs(source.get()));
            let target = new $.$mol_atom('target', () => {
                ++target_updates;
                return middle.get();
            });
            target.get();
            $.$mol_assert_equal(target_updates, 1);
            source.set(-1);
            target.get();
            $.$mol_assert_equal(target_updates, 1);
        },
        'obsolete atoms actualized in initial order'() {
            let actualizations = '';
            let source = new $.$mol_atom('source', (next) => next || 1);
            let middle = new $.$mol_atom('middle', () => {
                actualizations += 'M';
                return source.get();
            });
            let target = new $.$mol_atom('target', () => {
                actualizations += 'T';
                source.get();
                return middle.get();
            });
            target.get();
            $.$mol_assert_equal(actualizations, 'TM');
            source.set(2);
            $.$mol_defer.run();
            $.$mol_assert_equal(actualizations, 'TMTM');
        },
        'automatic deferred restart'() {
            let targetValue;
            let source = new $.$mol_atom('source', (next) => next || 1);
            let middle = new $.$mol_atom('middle', () => source.get() + 1);
            let target = new $.$mol_atom('target', () => targetValue = middle.get() + 1);
            target.get();
            $.$mol_assert_equal(targetValue, 3);
            source.set(2);
            $.$mol_assert_equal(targetValue, 3);
            $.$mol_defer.run();
            $.$mol_assert_equal(targetValue, 4);
        },
        'Right reactive change of source'() {
            let targetValue;
            let test_counter = new $.$mol_atom('test_counter', next => {
                new $.$mol_defer(() => {
                    test_counter.push(next || 1);
                });
                throw new $.$mol_atom_wait;
            });
            let slave = new $.$mol_atom('slave', next => test_counter.get());
            slave.actualize();
            let res = [];
            const error = new Error('test error');
            const test_task = new $.$mol_atom('test_task')
                .then(() => test_counter.get() + 1)
                .then(next => test_counter.set(next))
                .then(next => {
                test_counter.set(next + 1);
                throw error;
            })
                .catch(error => [error])
                .then(next => res = next);
            $.$mol_defer.run();
            $.$mol_assert_equal(test_counter.get(), 3);
            $.$mol_assert_equal(res[0], error);
        },
        'error handling'() {
            let source = new $.$mol_atom('source', (next) => {
                const error = new Error('Test error');
                error['$mol_atom_catched'] = true;
                throw error;
            });
            let middle = new $.$mol_atom('middle', () => source.get() + 1);
            let target = new $.$mol_atom('target', () => middle.get() + 1);
            $.$mol_assert_fail(() => target.get().valueOf());
        },
        'setting equal state are ignored'() {
            let atom = new $.$mol_atom('atom', next => next || { foo: [777] });
            let v1 = atom.get();
            let v2 = { foo: [777] };
            let v3 = atom.set(v2);
            $.$mol_assert_equal(v1, v3);
            $.$mol_assert_unique(v2, v3);
        },
        'setting equal to last setted are ignored until changed'() {
            let val = { foo: [777] };
            let called = 0;
            let atom = new $.$mol_atom('atom', () => {
                ++called;
                return val;
            });
            atom.get();
            $.$mol_assert_equal(called, 1);
            atom.set({ foo: [666] });
            $.$mol_assert_equal(called, 2);
            atom.set({ foo: [666] });
            $.$mol_assert_equal(called, 2);
            atom.value({ foo: [666] }, $.$mol_atom_force_update);
            $.$mol_assert_equal(called, 3);
            atom.push({ foo: [777] });
            atom.set({ foo: [666] });
            $.$mol_assert_equal(called, 4);
            atom.set({ foo: [555] });
            $.$mol_assert_equal(called, 5);
        },
        'Next remains after restart'() {
            let defer = new $.$mol_atom('defer', next => {
                new $.$mol_defer(() => {
                    defer.push({});
                });
                throw new $.$mol_atom_wait;
            });
            let value = {};
            let task = new $.$mol_atom('task', next => {
                defer.get().valueOf();
                return next;
            });
            $.$mol_assert_fail(() => task.set(value).valueOf(), $.$mol_atom_wait);
            $.$mol_defer.run();
            $.$mol_assert_equal(task.get(), value);
        },
    });
})($ || ($ = {}));
//atom.test.js.map
;
"use strict";
var $;
(function ($) {
    let $mol_atom_status;
    (function ($mol_atom_status) {
        $mol_atom_status["obsolete"] = "obsolete";
        $mol_atom_status["checking"] = "checking";
        $mol_atom_status["pulling"] = "pulling";
        $mol_atom_status["actual"] = "actual";
    })($mol_atom_status = $.$mol_atom_status || ($.$mol_atom_status = {}));
    class $mol_atom extends $.$mol_object {
        constructor(id, handler = next => next) {
            super();
            this.masters = null;
            this.slaves = null;
            this.status = $mol_atom_status.obsolete;
            this.object_id(id);
            this.handler = handler;
        }
        destructor() {
            this.unlink();
            this.status = $mol_atom_status.actual;
            const value = this['value()'];
            if (value instanceof $.$mol_object) {
                if (value.object_owner() === this)
                    value.destructor();
            }
            this['value()'] = undefined;
        }
        unlink() {
            this.disobey_all();
            this.check_slaves();
        }
        get(force) {
            const slave = $mol_atom.stack[0];
            if (slave) {
                this.lead(slave);
                slave.obey(this);
            }
            this.actualize(force);
            const value = this['value()'];
            if (typeof Proxy !== 'function' && value instanceof Error) {
                throw value;
            }
            return value;
        }
        actualize(force) {
            if (this.status === $mol_atom_status.pulling) {
                throw new Error(`Cyclic atom dependency of ${this}`);
            }
            if (!force && this.status === $mol_atom_status.actual)
                return;
            const slave = $mol_atom.stack[0];
            $mol_atom.stack[0] = this;
            if (!force && this.status === $mol_atom_status.checking) {
                this.masters.forEach(master => {
                    if (this.status !== $mol_atom_status.checking)
                        return;
                    master.actualize();
                });
                if (this.status === $mol_atom_status.checking) {
                    this.status = $mol_atom_status.actual;
                }
            }
            if (force || this.status !== $mol_atom_status.actual) {
                const oldMasters = this.masters;
                this.masters = null;
                if (oldMasters)
                    oldMasters.forEach(master => {
                        master.dislead(this);
                    });
                this.status = $mol_atom_status.pulling;
                const next = this.pull(force);
                if (next === undefined) {
                    this.status = $mol_atom_status.actual;
                }
                else {
                    this.push(next);
                }
            }
            $mol_atom.stack[0] = slave;
        }
        pull(force) {
            try {
                return this.handler(this._next, force);
            }
            catch (error) {
                if (error['$mol_atom_catched'])
                    return error;
                if (error instanceof $mol_atom_wait)
                    return error;
                console.error(error.stack || error);
                if (!(error instanceof Error)) {
                    error = new Error(error.stack || error);
                }
                error['$mol_atom_catched'] = true;
                return error;
            }
        }
        set(next) {
            return this.value(next);
        }
        push(next_raw) {
            if (!(next_raw instanceof $mol_atom_wait)) {
                this._ignore = this._next;
                this._next = undefined;
            }
            this.status = next_raw === undefined ? $mol_atom_status.obsolete : $mol_atom_status.actual;
            const prev = this['value()'];
            let next = (next_raw instanceof Error || prev instanceof Error) ? next_raw : $.$mol_conform(next_raw, prev);
            if (next === prev)
                return prev;
            if (prev instanceof $.$mol_object) {
                if (prev.object_owner() === this)
                    prev.destructor();
            }
            if (next instanceof $.$mol_object) {
                next.object_owner(this);
            }
            if ((typeof Proxy === 'function') && (next instanceof Error)) {
                next = new Proxy(next, {
                    get(target) {
                        throw target.valueOf();
                    },
                    ownKeys(target) {
                        throw target.valueOf();
                    },
                });
            }
            this['value()'] = next;
            $.$mol_log(this, prev, '➔', next);
            this.obsolete_slaves();
            return next;
        }
        obsolete_slaves() {
            if (!this.slaves)
                return;
            this.slaves.forEach(slave => slave.obsolete());
        }
        check_slaves() {
            if (this.slaves) {
                this.slaves.forEach(slave => slave.check());
            }
            else {
                $mol_atom.actualize(this);
            }
        }
        check() {
            if (this.status === $mol_atom_status.actual) {
                this.status = $mol_atom_status.checking;
                this.check_slaves();
            }
        }
        obsolete() {
            if (this.status === $mol_atom_status.obsolete)
                return;
            this.status = $mol_atom_status.obsolete;
            this.check_slaves();
            return;
        }
        lead(slave) {
            if (!this.slaves) {
                this.slaves = new Set();
                $mol_atom.unreap(this);
            }
            this.slaves.add(slave);
        }
        dislead(slave) {
            if (!this.slaves)
                return;
            if (this.slaves.size === 1) {
                this.slaves = null;
                $mol_atom.reap(this);
            }
            else {
                this.slaves.delete(slave);
            }
        }
        obey(master) {
            if (!this.masters)
                this.masters = new Set();
            this.masters.add(master);
        }
        disobey(master) {
            if (!this.masters)
                return;
            this.masters.delete(master);
        }
        disobey_all() {
            if (!this.masters)
                return;
            this.masters.forEach(master => master.dislead(this));
            this.masters = null;
        }
        cache(next) {
            if (next === undefined)
                return this['value()'];
            return this['value()'] = next;
        }
        value(next, force) {
            if (force === $mol_atom_force_cache)
                return this.push(next);
            if (next !== undefined) {
                if (force === $mol_atom_force)
                    return this.push(next);
                let next_normal = $.$mol_conform(next, this._ignore);
                if (next_normal === this._ignore)
                    return this.get(force);
                if (!(this['value()'] instanceof Error)) {
                    next_normal = $.$mol_conform(next, this['value()']);
                    if (next_normal === this['value()'])
                        return this.get(force);
                }
                this._next = next_normal;
                this._ignore = next_normal;
                force = $mol_atom_force_update;
            }
            return this.get(force);
        }
        static actualize(atom) {
            $mol_atom.updating.push(atom);
            $mol_atom.schedule();
        }
        static reap(atom) {
            $mol_atom.reaping.add(atom);
            $mol_atom.schedule();
        }
        static unreap(atom) {
            $mol_atom.reaping.delete(atom);
        }
        static schedule() {
            if (this.scheduled)
                return;
            new $.$mol_defer($.$mol_log_group('$mol_atom.sync()', () => {
                if (!this.scheduled)
                    return;
                this.scheduled = false;
                this.sync();
            }));
            this.scheduled = true;
        }
        static sync() {
            this.schedule();
            while (true) {
                const atom = this.updating.shift();
                if (!atom)
                    break;
                if (this.reaping.has(atom))
                    continue;
                if (atom.status !== $mol_atom_status.actual)
                    atom.get();
            }
            while (this.reaping.size) {
                this.reaping.forEach(atom => {
                    this.reaping.delete(atom);
                    if (!atom.slaves)
                        atom.destructor();
                });
            }
            this.scheduled = false;
        }
        then(done, fail) {
            let prev;
            let next;
            const atom = new $mol_atom(`${this}.then(${done})`, () => {
                try {
                    if (prev == undefined) {
                        const val = this.get();
                        if (val instanceof $mol_atom_wait)
                            return val;
                        if (val)
                            val.valueOf();
                        prev = val;
                    }
                    if (next == undefined) {
                        const val = done(prev);
                        if (val instanceof $mol_atom_wait)
                            return val;
                        if (val)
                            val.valueOf();
                        next = val;
                    }
                    return next;
                }
                catch (error) {
                    if (error instanceof $mol_atom_wait)
                        return error;
                    if (fail)
                        return fail(error);
                    return error;
                }
            });
            $mol_atom.actualize(atom);
            return atom;
        }
        catch(fail) {
            return this.then(next => next, fail);
        }
    }
    $mol_atom.stack = [];
    $mol_atom.updating = [];
    $mol_atom.reaping = new Set();
    $mol_atom.scheduled = false;
    $.$mol_atom = $mol_atom;
    $.$mol_state_stack.set('$mol_atom.stack', $mol_atom.stack);
    function $mol_atom_current() {
        return $mol_atom.stack[0];
    }
    $.$mol_atom_current = $mol_atom_current;
    class $mol_atom_wait extends Error {
        constructor(message = 'Wait...') {
            super(message);
            this.name = '$mol_atom_wait';
            this['__proto__'] = new.target.prototype;
        }
    }
    $.$mol_atom_wait = $mol_atom_wait;
    class $mol_atom_force extends Object {
        static toString() { return this.name; }
    }
    $.$mol_atom_force = $mol_atom_force;
    class $mol_atom_force_cache extends $mol_atom_force {
    }
    $.$mol_atom_force_cache = $mol_atom_force_cache;
    class $mol_atom_force_update extends $mol_atom_force {
    }
    $.$mol_atom_force_update = $mol_atom_force_update;
})($ || ($ = {}));
//atom.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    $.$mol_test({
        'cached property with simple key'() {
            class X extends $.$mol_object {
                foo(id, next) {
                    if (next == null)
                        return new Number(123);
                    return new Number(next);
                }
            }
            __decorate([
                $.$mol_mem_key
            ], X.prototype, "foo", null);
            const x = new X;
            $.$mol_assert_equal(x.foo(0).valueOf(), 123);
            $.$mol_assert_equal(x.foo(0), x.foo(0));
            $.$mol_assert_unique(x.foo(0), x.foo(1));
            x.foo(0, 321);
            $.$mol_assert_equal(x.foo(0).valueOf(), 321);
            x.foo(0, null);
            $.$mol_assert_equal(x.foo(0).valueOf(), 123);
        },
        'cached property with complex key'() {
            class X extends $.$mol_object {
                foo(ids) {
                    return Math.random();
                }
            }
            __decorate([
                $.$mol_mem_key
            ], X.prototype, "foo", null);
            const x = new X;
            $.$mol_assert_equal(x.foo([0, 1]), x.foo([0, 1]));
            $.$mol_assert_unique(x.foo([0, 1]), x.foo([0, 2]));
        },
        'auto sync of properties'() {
            class X extends $.$mol_object {
                foo(next) {
                    return next || 1;
                }
                bar() {
                    return this.foo() + 1;
                }
                xxx() {
                    return this.bar() + 1;
                }
            }
            __decorate([
                $.$mol_mem
            ], X.prototype, "foo", null);
            __decorate([
                $.$mol_mem
            ], X.prototype, "bar", null);
            __decorate([
                $.$mol_mem
            ], X.prototype, "xxx", null);
            const x = new X;
            $.$mol_assert_equal(x.bar(), 2);
            $.$mol_assert_equal(x.xxx(), 3);
            x.foo(5);
            $.$mol_assert_equal(x.xxx(), 7);
        },
        'must be deferred destroyed when no longer referenced'() {
            let foo;
            let foo_destroyed = false;
            class B extends $.$mol_object {
                showing(next) {
                    if (next === void 0)
                        return true;
                    return next;
                }
                foo() {
                    return foo = new class extends $.$mol_object {
                        destructor() {
                            foo_destroyed = true;
                        }
                    };
                }
                bar() {
                    return this.showing() ? this.foo() : null;
                }
            }
            __decorate([
                $.$mol_mem
            ], B.prototype, "showing", null);
            __decorate([
                $.$mol_mem
            ], B.prototype, "foo", null);
            __decorate([
                $.$mol_mem
            ], B.prototype, "bar", null);
            var b = new B;
            var bar = b.bar();
            $.$mol_assert_ok(bar);
            b.showing(false);
            b.bar();
            $.$mol_defer.run();
            $.$mol_assert_ok(foo_destroyed);
            $.$mol_assert_not(b.bar());
            b.showing(true);
            $.$mol_defer.run();
            $.$mol_assert_unique(b.bar(), bar);
        },
        'wait for data'() {
            class Test extends $.$mol_object {
                source(next, force) {
                    new $.$mol_defer(() => {
                        this.source('Jin', $.$mol_atom_force_cache);
                    });
                    throw new $.$mol_atom_wait('Wait for data!');
                }
                middle() {
                    return this.source();
                }
                target() {
                    return this.middle();
                }
            }
            __decorate([
                $.$mol_mem
            ], Test.prototype, "source", null);
            __decorate([
                $.$mol_mem
            ], Test.prototype, "middle", null);
            __decorate([
                $.$mol_mem
            ], Test.prototype, "target", null);
            const t = new Test;
            $.$mol_assert_fail(() => t.target().valueOf(), $.$mol_atom_wait);
            $.$mol_defer.run();
            $.$mol_assert_equal(t.target(), 'Jin');
        },
    });
})($ || ($ = {}));
//mem.test.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_mem(obj, name, descr) {
        const value = descr.value;
        const store = new WeakMap();
        descr.value = function $mol_mem_value(next, force) {
            const host = this;
            let atom = store.get(host);
            if (!atom) {
                const id = `${host}.${name}()`;
                atom = new $.$mol_atom(id, function () {
                    const v = value.apply(host, arguments);
                    if (v instanceof $.$mol_object) {
                        if (!v.object_host()) {
                            v.object_host(host);
                            v.object_field(name);
                            v.object_id(id);
                        }
                    }
                    return v;
                });
                atom.object_owner(host);
                const destructor = atom.destructor;
                atom.destructor = () => {
                    store.delete(host);
                    destructor.call(atom);
                };
                store.set(host, atom);
            }
            return atom.value(next, force);
        };
        Object.defineProperty(obj, name + "()", { get: function () { return store.get(this); } });
        descr.value['value'] = value;
        return descr;
    }
    $.$mol_mem = $mol_mem;
    function $mol_mem_key(obj, name, descr) {
        const value = descr.value;
        const store = new WeakMap();
        descr.value = function $mol_mem_key_value(key, next, force) {
            const host = this;
            const key_str = JSON.stringify(key);
            let dict = store.get(host);
            if (!dict)
                store.set(host, dict = {});
            let atom = dict[key_str];
            if (!atom) {
                const id = `${host}.${name}(${key_str})`;
                atom = new $.$mol_atom(id, function (...args) {
                    const v = value.apply(host, [key, ...args]);
                    if (v instanceof $.$mol_object) {
                        if (!v.object_host()) {
                            v.object_host(host);
                            v.object_field(name);
                            v.object_id(id);
                        }
                    }
                    return v;
                });
                const destructor = atom.destructor;
                atom.destructor = () => {
                    delete dict[key_str];
                    destructor.call(atom);
                };
                dict[key_str] = atom;
            }
            return atom.value(next, force);
        };
        Object.defineProperty(obj, name + "()", { get: function () { return store.get(this); } });
        void (descr.value['value'] = value);
        return descr;
    }
    $.$mol_mem_key = $mol_mem_key;
})($ || ($ = {}));
//mem.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_test({
        'const returns stored value'() {
            const foo = { bar: $.$mol_const(Math.random()) };
            $.$mol_assert_equal(foo.bar(), foo.bar());
            $.$mol_assert_equal(foo.bar(), foo.bar['()']);
        },
    });
})($ || ($ = {}));
//const.test.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_const(value) {
        var getter = (() => value);
        getter['()'] = value;
        return getter;
    }
    $.$mol_const = $mol_const;
})($ || ($ = {}));
//const.js.map
;
"use strict";
var $node = new Proxy({}, { get(target, field, wrapper) {
        return require(field);
    } });
//node.node.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $mol_file extends $.$mol_object {
        static absolute(path) {
            return $mol_file.make({
                path: $.$mol_const(path)
            });
        }
        static relative(path) {
            return $mol_file.absolute($node.path.resolve(path).replace(/\\/g, '/'));
        }
        path() {
            return '.';
        }
        watcher() {
            const watcher = $node.fs.watch(this.path(), { persistent: false }, (type, name) => {
                if (!name)
                    this.stat(undefined, $.$mol_atom_force_cache);
                else if (!/(^\.|___$)/.test(name)) {
                    var file = this.resolve(name);
                    file.stat(undefined, $.$mol_atom_force_cache);
                }
            });
            watcher.on('error', (error) => {
                this.stat(error, $.$mol_atom_force_cache);
            });
            return watcher;
        }
        stat(next, force) {
            var path = this.path();
            try {
                var stat = next || $node.fs.statSync(path);
            }
            catch (error) {
                if (error.code === 'ENOENT')
                    return null;
                return error;
            }
            this.parent().watcher();
            return stat;
        }
        version() {
            return this.stat().mtime.getTime().toString(36).toUpperCase();
        }
        exists(next) {
            var exists = !!this.stat();
            if (next === void 0) {
                return exists;
            }
            else {
                if (next == exists)
                    return exists;
                if (next) {
                    this.parent().exists(true);
                    $node.fs.mkdirSync(this.path());
                }
                else {
                    $node.fs.unlinkSync(this.path());
                }
                this.stat(undefined, $.$mol_atom_force_cache);
                return next;
            }
        }
        parent() {
            return this.resolve('..');
        }
        type() {
            var stat = this.stat();
            if (stat) {
                if (stat.isFile())
                    return 'file';
                if (stat.isDirectory())
                    return 'dir';
                if (stat.isBlockDevice())
                    return 'blocks';
                if (stat.isCharacterDevice())
                    return 'chars';
                if (stat.isSymbolicLink())
                    return 'link';
                if (stat.isFIFO())
                    return 'fifo';
                if (stat.isSocket())
                    return 'socket';
            }
            else {
                return null;
            }
            throw new Error(`Unknown file type ${this.path()}`);
        }
        name() {
            return $node.path.basename(this.path());
        }
        ext() {
            var match = /((?:\.\w+)+)$/.exec(this.path());
            return match ? match[1].substring(1) : '';
        }
        content(next, force) {
            if (next === void 0) {
                return this.stat() && $node.fs.readFileSync(this.path());
            }
            this.parent().exists(true);
            $node.fs.writeFileSync(this.path(), next);
            return next;
        }
        reader() {
            return $node.fs.createReadStream(this.path());
        }
        writer() {
            return $node.fs.createWriteStream(this.path());
        }
        sub() {
            this.stat();
            switch (this.type()) {
                case 'dir':
                    return $node.fs.readdirSync(this.path())
                        .filter(name => !/^\.+$/.test(name))
                        .map(name => this.resolve(name));
            }
            return [];
        }
        resolve(path) {
            return this.constructor.relative($node.path.join(this.path(), path));
        }
        relate(base = this.constructor.relative('.')) {
            return $node.path.relative(base.path(), this.path()).replace(/\\/g, '/');
        }
        append(next) {
            $node.fs.appendFileSync(this.path(), next);
        }
        find(include, exclude) {
            var found = [];
            this.sub().forEach(child => {
                if (exclude && child.path().match(exclude))
                    return;
                if (!include || child.path().match(include))
                    found.push(child);
                if (child.type() === 'dir')
                    found = found.concat(child.find(include, exclude));
            });
            return found;
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_file.prototype, "watcher", null);
    __decorate([
        $.$mol_mem
    ], $mol_file.prototype, "stat", null);
    __decorate([
        $.$mol_mem
    ], $mol_file.prototype, "version", null);
    __decorate([
        $.$mol_mem
    ], $mol_file.prototype, "type", null);
    __decorate([
        $.$mol_mem
    ], $mol_file.prototype, "content", null);
    __decorate([
        $.$mol_mem
    ], $mol_file.prototype, "sub", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_file, "absolute", null);
    $.$mol_file = $mol_file;
})($ || ($ = {}));
//file.node.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_test({
        'scalars'() {
            $.$mol_assert_equal($.$mol_typeof(void 0), 'Undefined');
            $.$mol_assert_equal($.$mol_typeof(null), 'Null');
            $.$mol_assert_equal($.$mol_typeof(0), 'Number');
            $.$mol_assert_equal($.$mol_typeof(''), 'String');
            $.$mol_assert_equal($.$mol_typeof(false), 'Boolean');
        },
        'common objects'() {
            $.$mol_assert_equal($.$mol_typeof({}), 'Object');
            $.$mol_assert_equal($.$mol_typeof([]), 'Array');
            $.$mol_assert_equal($.$mol_typeof(arguments), 'Arguments');
        },
        'special classes'() {
            $.$mol_assert_equal($.$mol_typeof(new Date), 'Date');
            $.$mol_assert_equal($.$mol_typeof(new RegExp('')), 'RegExp');
        },
    });
})($ || ($ = {}));
//typeof.test.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_typeof(value) {
        var str = {}.toString.apply(value);
        var type = str.substring(8, str.length - 1);
        return type;
    }
    $.$mol_typeof = $mol_typeof;
})($ || ($ = {}));
//typeof.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_test({
        'tree parsing'() {
            $.$mol_assert_equal($.$mol_tree.fromString("foo\nbar\n").sub.length, 2);
            $.$mol_assert_equal($.$mol_tree.fromString("foo\nbar\n").sub[1].type, "bar");
            $.$mol_assert_equal($.$mol_tree.fromString("foo\n\n\n").sub.length, 1);
            $.$mol_assert_equal($.$mol_tree.fromString("=foo\n\\bar\n").sub.length, 2);
            $.$mol_assert_equal($.$mol_tree.fromString("=foo\n\\bar\n").sub[1].data, "bar");
            $.$mol_assert_equal($.$mol_tree.fromString("foo bar \\pol").sub[0].sub[0].sub[0].data, "pol");
            $.$mol_assert_equal($.$mol_tree.fromString("foo bar\n\t\\pol\n\t\\men").sub[0].sub[0].sub[1].data, "men");
            $.$mol_assert_equal($.$mol_tree.fromString('foo bar \\text\n').toString(), 'foo bar \\text\n');
        },
        'inserting'() {
            $.$mol_assert_equal($.$mol_tree.fromString('a b c d').insert(new $.$mol_tree, 'a', 'b', 'c').toString(), 'a b \\\n');
            $.$mol_assert_equal($.$mol_tree.fromString('a b').insert(new $.$mol_tree, 'a', 'b', 'c', 'd').toString(), 'a b c \\\n');
            $.$mol_assert_equal($.$mol_tree.fromString('a b c d').insert(new $.$mol_tree, 0, 0, 0).toString(), 'a b \\\n');
            $.$mol_assert_equal($.$mol_tree.fromString('a b').insert(new $.$mol_tree, 0, 0, 0, 0).toString(), 'a b \\\n\t\\\n');
            $.$mol_assert_equal($.$mol_tree.fromString('a b c d').insert(new $.$mol_tree, null, null, null).toString(), 'a b \\\n');
            $.$mol_assert_equal($.$mol_tree.fromString('a b').insert(new $.$mol_tree, null, null, null, null).toString(), 'a b \\\n\t\\\n');
        }
    });
})($ || ($ = {}));
//tree.test.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_tree {
        constructor(config = {}) {
            this.type = config.type || '';
            if (config.value) {
                var sub = $mol_tree.values(config.value);
                if (config.type || sub.length > 1) {
                    this.sub = sub.concat(config.sub || []);
                    this.data = config.data || '';
                }
                else {
                    this.data = sub[0].data;
                    this.sub = config.sub || [];
                }
            }
            else {
                this.data = config.data || '';
                this.sub = config.sub || [];
            }
            this.baseUri = config.baseUri || '';
            this.row = config.row || 0;
            this.col = config.col || 0;
        }
        static values(str, baseUri) {
            return str.split('\n').map((data, index) => new $mol_tree({
                data: data,
                baseUri: baseUri,
                row: index + 1
            }));
        }
        clone(config) {
            return new $mol_tree({
                type: ('type' in config) ? config.type : this.type,
                data: ('data' in config) ? config.data : this.data,
                sub: ('sub' in config) ? config.sub : this.sub,
                baseUri: ('baseUri' in config) ? config.baseUri : this.baseUri,
                row: ('row' in config) ? config.row : this.row,
                col: ('col' in config) ? config.col : this.col,
                value: config.value
            });
        }
        static fromString(str, baseUri) {
            var root = new $mol_tree({ baseUri: baseUri });
            var stack = [root];
            var row = 0;
            var lines = String(str).split(/\n/);
            lines.forEach(line => {
                ++row;
                var chunks = /^(\t*)((?:[^\n\t\\ ]+ *)*)(\\[^\n]*)?(.*?)(?:$|\n)/m.exec(line);
                if (!chunks || chunks[4])
                    throw new Error(`Syntax error at ${baseUri}:${row}\n${line}`);
                var indent = chunks[1];
                var path = chunks[2];
                var data = chunks[3];
                var deep = indent.length;
                var types = path ? path.replace(/ $/, '').split(/ +/) : [];
                if (stack.length <= deep)
                    throw new Error(`Too many tabs at ${baseUri}:${row}\n${line}`);
                stack.length = deep + 1;
                var parent = stack[deep];
                types.forEach(type => {
                    if (!type)
                        throw new Error(`Unexpected space symbol ${baseUri}:${row}\n${line}`);
                    var next = new $mol_tree({
                        type: type,
                        baseUri: baseUri,
                        row: row
                    });
                    parent.sub.push(next);
                    parent = next;
                });
                if (data) {
                    var next = new $mol_tree({
                        data: data.substring(1),
                        baseUri: baseUri,
                        row: row
                    });
                    parent.sub.push(next);
                    parent = next;
                }
                stack.push(parent);
            });
            return root;
        }
        static fromJSON(json, baseUri = '') {
            var type = $.$mol_typeof(json);
            switch (type) {
                case 'Boolean':
                case 'Null':
                case 'Number':
                    return new $mol_tree({
                        type: String(json),
                        baseUri: baseUri
                    });
                case 'String':
                    return new $mol_tree({
                        value: json,
                        baseUri: baseUri
                    });
                case 'Array':
                    return new $mol_tree({
                        type: "/",
                        sub: json.map(json => $mol_tree.fromJSON(json, baseUri))
                    });
                case 'Date':
                    return new $mol_tree({
                        type: "",
                        value: json.toISOString(),
                        baseUri: baseUri
                    });
                case 'Object':
                    var sub = [];
                    for (var key in json) {
                        if (json[key] === undefined)
                            continue;
                        if (/^[^\n\t\\ ]+$/.test(key)) {
                            var child = new $mol_tree({
                                type: key,
                                baseUri: baseUri
                            });
                        }
                        else {
                            var child = new $mol_tree({
                                value: key,
                                baseUri: baseUri
                            });
                        }
                        child.sub.push($mol_tree.fromJSON(json[key], baseUri));
                        sub.push(child);
                    }
                    return new $mol_tree({
                        type: "*",
                        sub: sub,
                        baseUri: baseUri
                    });
            }
            throw new Error(`Unsupported type (${type}) at ${baseUri}`);
        }
        get uri() {
            return this.baseUri + '#' + this.row + ':' + this.col;
        }
        toString(prefix = '') {
            var output = '';
            if (this.type.length) {
                if (!prefix.length) {
                    prefix = "\t";
                }
                output += this.type + " ";
                if (this.sub.length == 1) {
                    return output + this.sub[0].toString(prefix);
                }
                output += "\n";
            }
            else if (this.data.length || prefix.length) {
                output += "\\" + this.data + "\n";
            }
            for (var child of this.sub) {
                output += prefix;
                output += child.toString(prefix + "\t");
            }
            return output;
        }
        toJSON() {
            if (!this.type)
                return this.value;
            if (this.type === '//')
                return undefined;
            if (this.type === 'true')
                return true;
            if (this.type === 'false')
                return false;
            if (this.type === 'null')
                return null;
            if (this.type === 'dict') {
                var obj = {};
                for (var child of this.sub) {
                    var key = child.type || child.value;
                    if (key === '//')
                        continue;
                    var colon = child.select(':').sub[0];
                    if (!colon)
                        throw new Error(`Required colon after key at ${child.uri}`);
                    var val = colon.sub[0].toJSON();
                    if (val !== undefined)
                        obj[key] = val;
                }
                return obj;
            }
            if (this.type === 'list') {
                var res = [];
                this.sub.forEach(child => {
                    var val = child.toJSON();
                    if (val !== undefined)
                        res.push(val);
                });
                return res;
            }
            if (this.type === 'time') {
                return new Date(this.value);
            }
            if (String(Number(this.type)) == this.type.trim())
                return Number(this.type);
            throw new Error(`Unknown type (${this.type}) at ${this.uri}`);
        }
        get value() {
            var values = [];
            for (var child of this.sub) {
                if (child.type)
                    continue;
                values.push(child.value);
            }
            return this.data + values.join("\n");
        }
        insert(value, ...path) {
            if (path.length === 0)
                return value;
            const type = path[0];
            if (typeof type === 'string') {
                let replaced = false;
                const sub = this.sub.map((item, index) => {
                    if (item.type !== type)
                        return item;
                    replaced = true;
                    return item.insert(value, ...path.slice(1));
                });
                if (!replaced)
                    sub.push(new $mol_tree({ type }).insert(value, ...path.slice(1)));
                return this.clone({ sub });
            }
            else if (typeof type === 'number') {
                const sub = this.sub.slice();
                sub[type] = (sub[type] || new $mol_tree).insert(value, ...path.slice(1));
                return this.clone({ sub });
            }
            else {
                return this.clone({ sub: ((this.sub.length === 0) ? [new $mol_tree()] : this.sub).map(item => item.insert(value, ...path.slice(1))) });
            }
        }
        select(...path) {
            var next = [this];
            for (var type of path) {
                if (!next.length)
                    break;
                var prev = next;
                next = [];
                for (var item of prev) {
                    switch (typeof (type)) {
                        case 'string':
                            for (var child of item.sub) {
                                if (!type || (child.type == type)) {
                                    next.push(child);
                                }
                            }
                            break;
                        case 'number':
                            if (type < item.sub.length)
                                next.push(item.sub[type]);
                            break;
                        default: next.push(...item.sub);
                    }
                }
            }
            return new $mol_tree({ sub: next });
        }
        filter(path, value) {
            var sub = this.sub.filter(function (item) {
                var found = item.select(...path);
                if (value == null) {
                    return Boolean(found.sub.length);
                }
                else {
                    return found.sub.some(child => child.value == value);
                }
            });
            return new $mol_tree({ sub: sub });
        }
        transform(visit, stack = []) {
            const sub_stack = [this, ...stack];
            return visit(sub_stack, () => this.sub.map(node => node.transform(visit, sub_stack)).filter(n => n));
        }
        error(message) {
            return new Error(`${message}:\n${this} ${this.baseUri}:${this.row}:${this.col}`);
        }
    }
    $.$mol_tree = $mol_tree;
})($ || ($ = {}));
//tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_window extends $.$mol_object {
        static size(next) {
            return next || {
                width: 1024,
                height: 768,
            };
        }
    }
    $.$mol_window = $mol_window;
})($ || ($ = {}));
//window.node.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_dom_context = $node['jsdom'].jsdom().defaultView;
})($ || ($ = {}));
//context.node.js.map
;
"use strict";
var $;
(function ($) {
})($ || ($ = {}));
//context.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_fields(el, fields) {
        for (let key in fields) {
            const val = fields[key];
            if (val === undefined)
                continue;
            if (el[key] === val)
                continue;
            el[key] = val;
        }
    }
    $.$mol_dom_render_fields = $mol_dom_render_fields;
    function $mol_dom_render_children(el, childNodes) {
        const nodes = [];
        for (let i = 0; i < childNodes.length; ++i) {
            let node = childNodes[i];
            if (node == null)
                continue;
            if (Object(node) === node) {
                if (node['dom_tree'])
                    node = node['dom_tree']();
                nodes.push(node);
            }
            else {
                nodes.push(String(node));
            }
        }
        let nextNode = el.firstChild;
        for (let view_ of nodes) {
            const view = view_.valueOf();
            if (view instanceof $.$mol_dom_context.Node) {
                while (true) {
                    if (!nextNode) {
                        el.appendChild(view);
                        break;
                    }
                    if (nextNode == view) {
                        nextNode = nextNode.nextSibling;
                        break;
                    }
                    else {
                        if (nodes.indexOf(nextNode) === -1) {
                            const nn = nextNode.nextSibling;
                            el.removeChild(nextNode);
                            nextNode = nn;
                        }
                        else {
                            el.insertBefore(view, nextNode);
                            break;
                        }
                    }
                }
            }
            else {
                if (nextNode && nextNode.nodeName === '#text') {
                    nextNode.nodeValue = String(view);
                    nextNode = nextNode.nextSibling;
                }
                else {
                    const textNode = $.$mol_dom_context.document.createTextNode(String(view));
                    el.insertBefore(textNode, nextNode);
                }
            }
        }
        while (nextNode) {
            const currNode = nextNode;
            nextNode = currNode.nextSibling;
            el.removeChild(currNode);
        }
    }
    $.$mol_dom_render_children = $mol_dom_render_children;
    function $mol_dom_render_attributes(el, attrs) {
        for (let name in attrs) {
            let val = attrs[name];
            if (val === null || val === false)
                el.removeAttribute(name);
            else
                el.setAttribute(name, String(val));
        }
    }
    $.$mol_dom_render_attributes = $mol_dom_render_attributes;
    function $mol_dom_render_styles(el, styles) {
        for (let name in styles) {
            let val = styles[name];
            const style = el.style;
            const cur = style[name];
            if (typeof val === 'number') {
                if (parseFloat(cur) == val)
                    continue;
                style[name] = `${val}px`;
            }
            if (cur !== val)
                style[name] = val;
        }
    }
    $.$mol_dom_render_styles = $mol_dom_render_styles;
    function $mol_dom_render_events(el, events) {
        for (let name in events) {
            el.addEventListener(name, $.$mol_log_group(el.id + ' ' + name, events[name]), { passive: false });
        }
    }
    $.$mol_dom_render_events = $mol_dom_render_events;
    function $mol_dom_render_events_async(el, events) {
        for (let name in events) {
            el.addEventListener(name, $.$mol_log_group(el.id + ' ' + name, events[name]), { passive: true });
        }
    }
    $.$mol_dom_render_events_async = $mol_dom_render_events_async;
})($ || ($ = {}));
//render.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    $.$mol_test({
        'id auto generation'() {
            class $mol_view_test_item extends $.$mol_view {
            }
            class $mol_view_test_block extends $.$mol_view {
                element(id) {
                    return new $mol_view_test_item();
                }
            }
            __decorate([
                $.$mol_mem_key
            ], $mol_view_test_block.prototype, "element", null);
            var x = new $mol_view_test_block();
            $.$mol_assert_equal(x.dom_node().id, '');
            $.$mol_assert_equal(x.element(0).dom_node().id, '.element(0)');
        },
        'caching ref to dom node'() {
            var x = new class extends $.$mol_view {
            };
            $.$mol_assert_equal(x.dom_node(), x.dom_node());
        },
        'content render'() {
            class $mol_view_test extends $.$mol_view {
                sub() {
                    return ['lol', 5];
                }
            }
            var x = new $mol_view_test();
            var node = x.dom_tree();
            $.$mol_assert_equal(node.innerHTML, 'lol5');
        },
        'bem attributes generation'() {
            class $mol_view_test_item extends $.$mol_view {
            }
            class $mol_view_test_block extends $.$mol_view {
                Element(id) {
                    return new $mol_view_test_item();
                }
            }
            __decorate([
                $.$mol_mem_key
            ], $mol_view_test_block.prototype, "Element", null);
            var x = new $mol_view_test_block();
            $.$mol_assert_equal(x.dom_node().getAttribute('mol_view_test_block'), '');
            $.$mol_assert_equal(x.dom_node().getAttribute('mol_view'), '');
            $.$mol_assert_equal(x.Element(0).dom_node().getAttribute('mol_view_test_block_element'), '');
            $.$mol_assert_equal(x.Element(0).dom_node().getAttribute('mol_view_test_item'), '');
            $.$mol_assert_equal(x.Element(0).dom_node().getAttribute('mol_view'), '');
        },
        'render custom attributes'() {
            class $mol_view_test extends $.$mol_view {
                attr() {
                    return {
                        'href': '#haha',
                        'required': true,
                        'hidden': false,
                    };
                }
            }
            var x = new $mol_view_test();
            var node = x.dom_tree();
            $.$mol_assert_equal(node.getAttribute('href'), '#haha');
            $.$mol_assert_equal(node.getAttribute('required'), 'true');
            $.$mol_assert_equal(node.getAttribute('hidden'), null);
        },
        'render custom fields'() {
            class $mol_view_test extends $.$mol_view {
                field() {
                    return {
                        'hidden': true
                    };
                }
            }
            var x = new $mol_view_test();
            var node = x.dom_tree();
            $.$mol_assert_equal(node.hidden, true);
        },
        'attach event handlers'() {
            var clicked = false;
            class $mol_view_test extends $.$mol_view {
                event() {
                    return {
                        'click': (next) => this.event_click(next)
                    };
                }
                event_click(next) {
                    clicked = true;
                }
            }
            var x = new $mol_view_test();
            var node = x.dom_node();
            node.click();
            $.$mol_assert_ok(clicked);
        },
    });
})($ || ($ = {}));
//view.test.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    let $$;
    (function ($$_1) {
        let $$;
    })($$ = $.$$ || ($.$$ = {}));
    let $mol;
    (function ($mol_1) {
        let $mol;
    })($mol = $.$mol || ($.$mol = {}));
    function $mol_view_visible_width() {
        return $.$mol_window.size().width;
    }
    $.$mol_view_visible_width = $mol_view_visible_width;
    function $mol_view_visible_height() {
        return $.$mol_window.size().height;
    }
    $.$mol_view_visible_height = $mol_view_visible_height;
    function $mol_view_state_key(suffix) {
        return suffix;
    }
    $.$mol_view_state_key = $mol_view_state_key;
    class $mol_view extends $.$mol_object {
        static Root(id) {
            return new this;
        }
        static autobind() {
            const nodes = $.$mol_dom_context.document.querySelectorAll('[mol_view_root]');
            for (let i = nodes.length - 1; i >= 0; --i) {
                const name = nodes.item(i).getAttribute('mol_view_root');
                const View = $[name];
                if (!View) {
                    console.error(`Can not attach view. Class not found: ${name}`);
                    continue;
                }
                const view = View.Root(i);
                view.dom_tree(nodes.item(i));
                document.title = view.title();
            }
        }
        title() {
            return this.constructor.toString();
        }
        focused(next) {
            let node = this.dom_node();
            const value = $.$mol_view_selection.focused(next === undefined ? undefined : next ? [node] : []) || [];
            return value.indexOf(node) !== -1;
        }
        context(next) {
            return next || $;
        }
        get $() {
            return this.context();
        }
        set $(next) {
            this.context(next);
        }
        context_sub() {
            return this.context();
        }
        state_key(suffix = '') {
            return this.$.$mol_view_state_key(suffix);
        }
        dom_name() {
            return this.constructor.toString().replace('$', '');
        }
        dom_name_space() { return 'http://www.w3.org/1999/xhtml'; }
        sub() {
            return null;
        }
        sub_visible() {
            const sub = this.sub();
            if (!sub)
                return sub;
            const context = this.context_sub();
            sub.forEach(child => {
                if (child instanceof $mol_view) {
                    child.$ = context;
                }
            });
            return sub;
        }
        minimal_width() {
            const sub = this.sub();
            if (!sub)
                return 0;
            let min = 0;
            sub.forEach(view => {
                if (view instanceof $mol_view) {
                    min = Math.max(min, view.minimal_width());
                }
            });
            return min;
        }
        minimal_height() {
            return this.content_height();
        }
        content_height() {
            const sub = this.sub();
            if (!sub)
                return 0;
            let min = 0;
            sub.forEach(view => {
                if (view instanceof $mol_view) {
                    min = Math.max(min, view.minimal_height());
                }
            });
            return min;
        }
        dom_node(next) {
            const node = next || this.$.$mol_dom_context.document.createElementNS(this.dom_name_space(), this.dom_name());
            node.setAttribute('id', this.toString());
            $.$mol_dom_render_attributes(node, this.attr_static());
            $.$mol_dom_render_events(node, this.event());
            $.$mol_dom_render_events_async(node, this.event_async());
            return node;
        }
        dom_tree(next) {
            const node = this.dom_node(next);
            try {
                for (let plugin of this.plugins())
                    plugin.render();
                this.render();
            }
            catch (error) {
                $.$mol_dom_render_attributes(node, { mol_view_error: error.name });
                if (error instanceof $.$mol_atom_wait)
                    return node;
                try {
                    void (node.innerText = error.message);
                }
                catch (e) { }
                if (error['$mol_atom_catched'])
                    return node;
                console.error(error);
                error['$mol_atom_catched'] = true;
            }
            return node;
        }
        render() {
            const node = this.dom_node();
            const sub = this.sub_visible();
            if (sub)
                $.$mol_dom_render_children(node, sub);
            $.$mol_dom_render_attributes(node, this.attr());
            $.$mol_dom_render_styles(node, this.style());
            const fields = this.field();
            $.$mol_dom_render_fields(node, fields);
            new $.$mol_defer(() => $.$mol_dom_render_fields(node, fields));
        }
        static view_classes() {
            const proto = this.prototype;
            let current = proto;
            const classes = [];
            while (current) {
                classes.push(current.constructor);
                if (!(current instanceof $mol_view))
                    break;
                current = Object.getPrototypeOf(current);
            }
            return classes;
        }
        view_names_owned() {
            const names = [];
            let owner = this.object_host();
            if (owner instanceof $mol_view) {
                const suffix = this.object_field();
                const suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1);
                for (let Class of owner.constructor.view_classes()) {
                    if (suffix in Class.prototype)
                        names.push($.$mol_func_name(Class) + suffix2);
                    else
                        break;
                }
                for (let prefix of owner.view_names_owned()) {
                    names.push(prefix + suffix2);
                }
            }
            return names;
        }
        view_names() {
            const names = [];
            for (let name of this.view_names_owned()) {
                if (names.indexOf(name) < 0)
                    names.push(name);
            }
            for (let Class of this.constructor.view_classes()) {
                const name = $.$mol_func_name(Class);
                if (names.indexOf(name) < 0)
                    names.push(name);
            }
            return names;
        }
        attr_static() {
            let attrs = {};
            for (let name of this.view_names())
                attrs[name.replace(/\$/g, '').toLowerCase()] = '';
            return attrs;
        }
        attr() {
            return {
                'mol_view_error': false,
            };
        }
        style() {
            return {};
        }
        field() {
            return {};
        }
        event() {
            return {};
        }
        event_async() {
            return {};
        }
        plugins() {
            return [];
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_view.prototype, "focused", null);
    __decorate([
        $.$mol_mem
    ], $mol_view.prototype, "context", null);
    __decorate([
        $.$mol_mem
    ], $mol_view.prototype, "minimal_width", null);
    __decorate([
        $.$mol_mem
    ], $mol_view.prototype, "content_height", null);
    __decorate([
        $.$mol_mem
    ], $mol_view.prototype, "dom_node", null);
    __decorate([
        $.$mol_mem
    ], $mol_view.prototype, "dom_tree", null);
    __decorate([
        $.$mol_mem
    ], $mol_view.prototype, "view_names", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_view, "Root", null);
    __decorate([
        $.$mol_mem
    ], $mol_view, "autobind", null);
    __decorate([
        $.$mol_mem
    ], $mol_view, "view_classes", null);
    $.$mol_view = $mol_view;
})($ || ($ = {}));
//view.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $mol_view_selection extends $.$mol_object {
        static focused(next, force) {
            if (next === undefined)
                return [];
            const node = next[0];
            const atom = $.$mol_atom_current();
            new $.$mol_defer(() => {
                if (node)
                    return node.focus();
                const el = atom.cache()[0];
                if (el)
                    el.blur();
            });
            return undefined;
        }
        static position(...diff) {
            if (diff.length) {
                if (!diff[0])
                    return diff[0];
                var start = diff[0].start;
                var end = diff[0].end;
                if (!(start <= end))
                    throw new Error(`Wrong offsets (${start},${end})`);
                var root = $.$mol_dom_context.document.getElementById(diff[0].id);
                root.focus();
                var range = new Range;
                var cur = root.firstChild;
                while (cur !== root) {
                    while (cur.firstChild)
                        cur = cur.firstChild;
                    if (cur.nodeValue) {
                        var length = cur.nodeValue.length;
                        if (length >= start)
                            break;
                        start -= length;
                    }
                    while (!cur.nextSibling) {
                        cur = cur.parentNode;
                        if (cur === root) {
                            start = root.childNodes.length;
                            break;
                        }
                    }
                }
                range.setStart(cur, start);
                var cur = root.firstChild;
                while (cur !== root) {
                    while (cur.firstChild)
                        cur = cur.firstChild;
                    if (cur.nodeValue) {
                        var length = cur.nodeValue.length;
                        if (length >= end)
                            break;
                        end -= length;
                    }
                    while (!cur.nextSibling) {
                        cur = cur.parentNode;
                        if (cur === root) {
                            end = root.childNodes.length;
                            break;
                        }
                    }
                }
                range.setEnd(cur, end);
                var sel = $.$mol_dom_context.document.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
                return diff[0];
            }
            else {
                var sel = $.$mol_dom_context.document.getSelection();
                if (sel.rangeCount === 0)
                    return null;
                var range = sel.getRangeAt(0);
                var el = range.commonAncestorContainer;
                while (el && !el.id)
                    el = el.parentElement;
                if (!el)
                    return { id: null, start: 0, end: 0 };
                var meter = new Range;
                meter.selectNodeContents(el);
                meter.setEnd(range.startContainer, range.startOffset);
                var startOffset = meter.toString().length;
                meter.setEnd(range.endContainer, range.endOffset);
                var endOffset = meter.toString().length;
                return { id: el.id, start: startOffset, end: endOffset };
            }
        }
        static onFocus(event) {
            const parents = [];
            let element = event.target;
            while (element) {
                parents.push(element);
                element = element.parentNode;
            }
            this.focused(parents, $.$mol_atom_force_cache);
        }
        static onBlur(event) {
            const focused = this.focused();
            setTimeout($.$mol_log_group('$mol_view_selection blur', () => {
                if (focused !== this.focused())
                    return;
                this.focused([], $.$mol_atom_force_cache);
            }));
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_view_selection, "focused", null);
    __decorate([
        $.$mol_mem
    ], $mol_view_selection, "position", null);
    $.$mol_view_selection = $mol_view_selection;
})($ || ($ = {}));
//selection.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_test({
        'local get set delete'() {
            var key = '$mol_state_local_test:' + Math.random();
            $.$mol_assert_equal($.$mol_state_local.value(key), null);
            $.$mol_state_local.value(key, 123);
            $.$mol_assert_equal($.$mol_state_local.value(key), 123);
            $.$mol_state_local.value(key, null);
            $.$mol_assert_equal($.$mol_state_local.value(key), null);
        },
    });
})($ || ($ = {}));
//local.test.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $mol_state_local extends $.$mol_object {
        static native() {
            if (this['native()'])
                return this['native()'];
            check: try {
                const native = $.$mol_dom_context.localStorage;
                if (!native)
                    break check;
                native.setItem('', '');
                native.removeItem('');
                return this['native()'] = native;
            }
            catch (error) {
                console.warn(error);
            }
            return this['native()'] = {
                getItem(key) {
                    return this[':' + key];
                },
                setItem(key, value) {
                    this[':' + key] = value;
                },
                removeItem(key) {
                    this[':' + key] = void 0;
                }
            };
        }
        static value(key, next, force) {
            if (next === void 0)
                return JSON.parse(this.native().getItem(key) || 'null');
            if (next === null)
                this.native().removeItem(key);
            else
                this.native().setItem(key, JSON.stringify(next));
            return next;
        }
        prefix() { return ''; }
        value(key, next) {
            return $mol_state_local.value(this.prefix() + '.' + key, next);
        }
    }
    __decorate([
        $.$mol_mem_key
    ], $mol_state_local, "value", null);
    $.$mol_state_local = $mol_state_local;
})($ || ($ = {}));
//local.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $mol_locale extends $.$mol_object {
        static lang_default() {
            return 'en';
        }
        static lang(next) {
            return $.$mol_state_local.value('locale', next) || $.$mol_dom_context.navigator.language.replace(/-.*/, '') || this.lang_default();
        }
        static source(lang) {
            return JSON.parse($.$mol_file.relative(`-/web.locale=${lang}.json`).content());
        }
        static texts(lang, next) {
            if (next)
                return next;
            try {
                return this.source(lang).valueOf();
            }
            catch (error) {
                if (error instanceof $.$mol_atom_wait)
                    throw error;
                const def = this.lang_default();
                if (lang === def)
                    throw error;
                return this.source(def);
            }
        }
        static text(key) {
            for (let lang of [this.lang(), 'en']) {
                const text = this.texts(lang)[key];
                if (text)
                    return text;
                console.warn(`Not translated to "${lang}": ${key}`);
            }
            return `<${key}>`;
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_locale, "lang_default", null);
    __decorate([
        $.$mol_mem
    ], $mol_locale, "lang", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_locale, "source", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_locale, "texts", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_locale, "text", null);
    $.$mol_locale = $mol_locale;
})($ || ($ = {}));
//locale.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_view_tree_trim_remarks(def) {
        return def.transform(([node], sub) => (node.type === '-') ? null : node.clone({ sub: sub() }));
    }
    $.$mol_view_tree_trim_remarks = $mol_view_tree_trim_remarks;
    function $mol_view_tree_classes(defs) {
        return $mol_view_tree_trim_remarks(defs);
    }
    $.$mol_view_tree_classes = $mol_view_tree_classes;
    function $mol_view_tree_class_name(val) {
        return val.type;
    }
    $.$mol_view_tree_class_name = $mol_view_tree_class_name;
    function $mol_view_tree_super_name(val) {
        if (val.sub.length != 1)
            throw val.error('Wrong sub count');
        return val.sub[0].type;
    }
    $.$mol_view_tree_super_name = $mol_view_tree_super_name;
    function $mol_view_tree_class_props(def) {
        const props = {};
        const catch_prop = (prop) => {
            if (prop.sub.length === 0)
                return;
            if (prop.sub[0].type === '-')
                return;
            props[prop.type] = props[prop.type];
            const def = prop.clone({
                sub: [prop.sub[0].transform(([node, ...stack], sub) => {
                        if (['<=', '<=>', '=>'].indexOf(node.type) === -1)
                            return node.clone({ sub: sub() });
                        catch_prop(node.sub[0]);
                        return node.clone({
                            sub: [node.sub[0].clone({
                                    sub: [
                                        node.sub[0].clone({
                                            type: '-',
                                            sub: [],
                                        })
                                    ]
                                })]
                        });
                    })]
            });
            if (props[prop.type]) {
                if (props[prop.type].toString() !== def.toString()) {
                    throw def.error('Property already defined with another default value');
                }
            }
            else {
                props[prop.type] = def;
            }
        };
        def.sub[0].sub.map(catch_prop);
        return def.clone({
            type: '',
            sub: Object.keys(props).map(name => props[name]),
        });
    }
    $.$mol_view_tree_class_props = $mol_view_tree_class_props;
    function $mol_view_tree_prop_name(prop) {
        return (prop.type.match(/^\w+/) || [])[0] || '';
    }
    $.$mol_view_tree_prop_name = $mol_view_tree_prop_name;
    function $mol_view_tree_prop_key(prop) {
        return (prop.type.match(/!(\w+)$/) || [])[1] || '';
    }
    $.$mol_view_tree_prop_key = $mol_view_tree_prop_key;
    function $mol_view_tree_prop_next(prop) {
        return (prop.type.match(/\?(\w+)$/) || [])[1] || '';
    }
    $.$mol_view_tree_prop_next = $mol_view_tree_prop_next;
    function $mol_view_tree_prop_value(prop) {
        if (prop.sub.length != 1)
            throw prop.error(`Wrong sub count (${prop.sub.length})`);
        return prop.sub[0];
    }
    $.$mol_view_tree_prop_value = $mol_view_tree_prop_value;
    function $mol_view_tree_value_type(val) {
        switch (val.type) {
            case 'true': return 'bool';
            case 'false': return 'bool';
            case 'null': return 'null';
            case '*': return 'dict';
            case '/': return 'list';
            case '@': return 'locale';
            case '': return 'string';
            case '<=': return 'get';
            case '<=>': return 'bind';
            case '=>': return 'put';
        }
        if (val.type[0] === '$')
            return 'object';
        if (Number(val.type).toString() == val.type)
            return 'number';
        throw val.error('Wrong value');
    }
    $.$mol_view_tree_value_type = $mol_view_tree_value_type;
    function $mol_view_tree_compile(tree) {
        var content = '';
        var locales = {};
        for (let def of $mol_view_tree_classes(tree).sub) {
            if (!/^\$\w+$/.test(def.type))
                throw def.error('Wrong component name');
            var parent = def.sub[0];
            var propDefs = {};
            var members = {};
            for (let param of $mol_view_tree_class_props(def).sub) {
                try {
                    var needSet = false;
                    var needReturn = true;
                    var needCache = false;
                    var keys = [];
                    if (param.type === '<=>') {
                        param = param.sub[0];
                    }
                    if (param.type === '<=') {
                        param = param.sub[0];
                    }
                    var propName = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec(param.type);
                    if (propName[3]) {
                        needSet = true;
                        needCache = true;
                    }
                    const getValue = (value) => {
                        try {
                            switch (true) {
                                case (value.type === ''):
                                    return JSON.stringify(value.value);
                                case (value.type === '@'):
                                    const key = `${def.type}_${param.type.replace(/[?!].*/, '')}`;
                                    locales[key] = value.value;
                                    return `$mol_locale.text( ${JSON.stringify(key)} )`;
                                case (value.type === '-'):
                                    return null;
                                case (value.type === '/'):
                                    var items = [];
                                    value.sub.forEach(item => {
                                        if (item.type === '-')
                                            return;
                                        if (item.type === '^') {
                                            items.push(`...super.${param.type}()`);
                                            return;
                                        }
                                        var val = getValue(item);
                                        if (val)
                                            items.push(val);
                                    });
                                    return '[]' + (items.length ? '.concat( ' + items.join(' , ') + ' )' : ' as any[]');
                                case (value.type[0] === '$'):
                                    needCache = true;
                                    var overs = [];
                                    value.sub.forEach(over => {
                                        if (/^-?$/.test(over.type))
                                            return '';
                                        var overName = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec(over.type);
                                        var ns = needSet;
                                        if (over.sub[0].type === '=>') {
                                            if (over.sub[0].sub.length === 1) {
                                                const method_name = over.sub[0].sub[0].type;
                                                members[method_name] = `\t${method_name}(){\n\t\treturn this.${param.type}().${over.type}()\n\t}\n\n`;
                                                return;
                                            }
                                        }
                                        var v = getValue(over.sub[0]);
                                        let args = [];
                                        if (overName[2])
                                            args.push(` ${overName[2]} : any `);
                                        if (overName[3])
                                            args.push(` ${overName[3]}? : any `);
                                        overs.push('\t\t\tobj.' + overName[1] + ' = (' + args.join(',') + ') => ' + v + '\n');
                                        needSet = ns;
                                    });
                                    return '(( obj )=>{\n' + overs.join('') + '\t\t\treturn obj\n\t\t})( new this.$.' + value.type + ' )';
                                case (value.type === '*'):
                                    var opts = [];
                                    value.sub.forEach(opt => {
                                        if (opt.type === '-')
                                            return '';
                                        if (opt.type === '^') {
                                            opts.push(`\t\t\t...super.${param.type}() ,\n`);
                                            return;
                                        }
                                        var key = /(.*?)(?:\?(\w+))?$/.exec(opt.type);
                                        keys.push(key[1]);
                                        var ns = needSet;
                                        var v = getValue(opt.sub[0]);
                                        var arg = key[2] ? ` ( ${key[2]}? : any )=> ` : '';
                                        opts.push('\t\t\t"' + key[1] + '" : ' + arg + ' ' + v + ' ,\n');
                                        needSet = ns;
                                    });
                                    return '({\n' + opts.join('') + '\t\t})';
                                case (value.type === '>'):
                                    throw new Error('Deprecated syntax `>`. Use `<=>` instead.');
                                case (value.type === '<=>'):
                                    needSet = true;
                                    if (value.sub.length === 1) {
                                        var type = /(.*?)(?:\!(\w+))?(?:\?(\w+))$/.exec(value.sub[0].type);
                                        return 'this.' + type[1] + '(' + (type[2] ? type[2] + ' ,' : '') + ' ' + type[3] + ' )';
                                    }
                                    break;
                                case (value.type === '<'):
                                    throw new Error('Deprecated syntax `<`. Use `<=` instead.');
                                case (value.type === '<='):
                                    if (value.sub.length === 1) {
                                        var type = /(.*?)(?:\!(\w+))?(?:\?(\w+))?$/.exec(value.sub[0].type);
                                        return 'this.' + type[1] + '(' + (type[2] ? type[2] : '') + ')';
                                    }
                                    break;
                            }
                            switch (value.type) {
                                case 'true':
                                case 'false':
                                    return value.type;
                                case 'null':
                                    return 'null as any';
                            }
                            if (Number(value.type).toString() == value.type)
                                return value.type;
                            throw value.error('Wrong value');
                        }
                        catch (err) {
                            err.message += `\n${value.baseUri}:${value.row}:${value.col}\n${value}`;
                            throw err;
                        }
                    };
                    if (param.sub.length > 1)
                        throw new Error('Too more sub');
                    if (param.sub.length < 1)
                        throw new Error('Need default value (use "-" for inherit)');
                    param.sub.forEach(child => {
                        var val = getValue(child);
                        if (!val)
                            return;
                        propDefs[propName[1]] = param;
                        var args = [];
                        if (propName[2])
                            args.push(` ${propName[2]} : any `);
                        if (propName[3])
                            args.push(` ${propName[3]}? : any , force? : $${''}mol_atom_force `);
                        if (needSet && param.sub[0].type !== '<=>')
                            val = (needReturn ? `( ${propName[3]} !== void 0 ) ? ${propName[3]} : ` : `if( ${propName[3]} !== void 0 ) return ${propName[3]}\n\t\t`) + val;
                        if (needReturn)
                            val = 'return ' + val;
                        var decl = '\t' + propName[1] + '(' + args.join(',') + ') {\n\t\t' + val + '\n\t}\n\n';
                        if (needCache) {
                            if (propName[2])
                                decl = '\t@ $' + 'mol_mem_key\n' + decl;
                            else
                                decl = '\t@ $' + 'mol_mem\n' + decl;
                        }
                        decl = param.toString().trim().replace(/^/gm, '\t/// ') + '\n' + decl;
                        members[propName[1]] = decl;
                    });
                }
                catch (err) {
                    err.message += `\n${param.baseUri}:${param.row}:${param.col}\n${param}`;
                    throw err;
                }
            }
            var body = Object.keys(members).map(function (name) {
                return members[name] || '\t' + name + '() { return null as any }\n\t}\n';
            }).join('');
            var classes = 'namespace $ { export class ' + def.type + ' extends ' + parent.type + ' {\n\n' + body + '} }\n';
            content += classes + '\n';
        }
        return { script: content, locales: locales };
    }
    $.$mol_view_tree_compile = $mol_view_tree_compile;
})($ || ($ = {}));
//tree.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_test({
        'sorting must cut cycles at low priority edges'() {
            var graph = new $.$mol_graph();
            graph.link('A', 'B', { priority: 0 });
            graph.link('B', 'C', { priority: -2 });
            graph.link('C', 'D', { priority: 0 });
            graph.link('D', 'A', { priority: -1 });
            $.$mol_assert_equal(graph.sorted(edge => edge.priority).join(''), 'BADC');
        }
    });
})($ || ($ = {}));
//graph.test.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_graph {
        constructor() {
            this.nodes = {};
            this.edgesOut = {};
            this.edgesIn = {};
        }
        nodeEnsure(id) {
            if (this.nodes.hasOwnProperty(id))
                return;
            this.nodes[id] = null;
        }
        linkOut(from, to, edge) {
            if (!this.edgesOut[from]) {
                this.edgesOut[from] = {};
                this.nodeEnsure(from);
            }
            this.edgesOut[from][to] = edge;
            this.nodeEnsure(to);
        }
        linkIn(to, from, edge) {
            if (!this.edgesIn[to]) {
                this.edgesIn[to] = {};
                this.nodeEnsure(to);
            }
            this.edgesIn[to][from] = edge;
            this.nodeEnsure(from);
        }
        edgeOut(from, to) {
            return this.edgesOut[from] && this.edgesOut[from][to];
        }
        edgeIn(to, from) {
            return this.edgesIn[to] && this.edgesIn[to][from];
        }
        link(one, two, edge) {
            this.linkOut(one, two, edge);
            this.linkIn(two, one, edge);
        }
        sorted(getWeight) {
            var pending = Object.keys(this.nodes);
            var visited = [];
            var weights = [];
            var sorted = [];
            var visit = (id, weight) => {
                var index = visited.lastIndexOf(id);
                if (index >= 0) {
                    if (index === visited.length - 1)
                        return false;
                    if (weight <= weights[index + 1])
                        return false;
                }
                if (weight != null) {
                    visited.push(id);
                    weights.push(weight);
                }
                var deps = this.edgesOut[id];
                for (var dep in deps) {
                    if (dep === id)
                        continue;
                    visit(dep, getWeight(deps[dep]));
                }
                if (sorted.indexOf(id) !== -1)
                    return false;
                sorted.push(id);
                return true;
            };
            pending.forEach(id => visit(id, null));
            return sorted;
        }
    }
    $.$mol_graph = $mol_graph;
})($ || ($ = {}));
//graph.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_exec(dir, command, ...args) {
        console.log(`${dir}> ${command} ${args.join(' ')}`);
        var res = $node.child_process.spawnSync(command, args, { cwd: dir, stdio: ['pipe', process.stdout, 'pipe'] });
        if (res.status)
            throw new Error(res.stderr.toString());
        return res;
    }
    $.$mol_exec = $mol_exec;
})($ || ($ = {}));
//exec.node.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    function $mol_build_start(paths) {
        var build = $mol_build.relative('.');
        if (paths.length > 0) {
            process.argv.slice(2).forEach((path) => {
                path = build.root().resolve(path).path();
                build.bundle({ path }).valueOf();
            });
        }
        else {
            build.server().express();
        }
    }
    $.$mol_build_start = $mol_build_start;
    setImmediate(() => {
        $mol_build_start(process.argv.slice(2));
    });
    class $mol_build extends $.$mol_object {
        static root(path) {
            return this.make({
                root: $.$mol_const($.$mol_file.absolute(path)),
            });
        }
        static relative(path) {
            return $mol_build.root($.$mol_file.relative(path).path());
        }
        server() {
            return $.$mol_build_server.make({
                build: $.$mol_const(this),
            });
        }
        root() {
            return $.$mol_file.relative('.');
        }
        mods({ path, exclude }) {
            const mods = [];
            $.$mol_file.absolute(path).sub()
                .forEach(child => {
                const name = child.name();
                if (!/^[a-z]/i.test(name))
                    return false;
                if (exclude && RegExp('[.=](' + exclude.join('|') + ')[.]', 'i').test(name))
                    return false;
                if (/(view\.tree)$/.test(name)) {
                    const script = child.parent().resolve(`-view.tree/${child.name()}.ts`);
                    const locale = child.parent().resolve(`-view.tree/${child.name()}.locale=en.json`);
                    const tree = $.$mol_tree.fromString(String(child.content()), child.path());
                    const res = $.$mol_view_tree_compile(tree);
                    script.content(res.script);
                    locale.content(JSON.stringify(res.locales, null, '\t'));
                    mods.push(script, locale, child);
                }
                else {
                    mods.push(child);
                }
                return true;
            });
            return mods;
        }
        modsRecursive({ path, exclude }) {
            var mod = $.$mol_file.absolute(path);
            switch (mod.type()) {
                case 'file':
                    return [mod];
                case 'dir':
                    var mods = [mod];
                    for (var m of this.mods({ path, exclude })) {
                        if (m.type() !== 'dir')
                            continue;
                        for (var dep of this.modsRecursive({ path: m.path(), exclude })) {
                            if (mods.indexOf(dep) !== -1)
                                continue;
                            mods.push(dep);
                        }
                    }
                    return mods;
                case null:
                    throw new Error(`Module not found: "${mod.relate()}"`);
            }
            throw new Error(`Unsopported type "${mod.type()}" of "${mod.relate()}"`);
        }
        sources({ path, exclude }) {
            const mod = $.$mol_file.absolute(path);
            switch (mod.type()) {
                case 'file':
                    return [mod];
                case 'dir':
                    return this.mods({ path, exclude }).filter(mod => mod.type() === 'file');
                default:
                    return [];
            }
        }
        sourcesSorted({ path, exclude }) {
            const mod = $.$mol_file.absolute(path);
            const graph = new $.$mol_graph();
            const sources = this.sources({ path, exclude });
            for (let src of sources) {
                graph.nodeEnsure(src.relate(this.root()));
            }
            for (let src of sources) {
                let deps = this.srcDeps(src.path());
                for (let p in deps) {
                    var names;
                    if (p[0] === '/')
                        names = p.substring(1).split('/');
                    else
                        names = mod.resolve(p).relate(this.root()).split('/');
                    let files = [this.root()];
                    for (let name of names) {
                        let nextFiles = [];
                        for (let file of files) {
                            let validName = new RegExp(`^(${file.name()})?${name}(?![a-z0-9])`, 'i');
                            for (let child of this.mods({ path: file.path(), exclude })) {
                                if (!child.name().match(validName))
                                    continue;
                                nextFiles.push(child);
                            }
                        }
                        if (nextFiles.length === 0)
                            break;
                        files = nextFiles;
                    }
                    for (let file of files) {
                        if (file === this.root())
                            continue;
                        if (file.relate(this.root()) in graph.nodes) {
                            graph.link(src.relate(this.root()), file.relate(this.root()), { priority: deps[p] });
                        }
                    }
                }
            }
            let next = graph.sorted(edge => edge.priority).map(name => this.root().resolve(name));
            return next;
        }
        sourcesAll({ path, exclude }) {
            const sortedPaths = this.graph({ path, exclude }).sorted(edge => edge.priority);
            let sources = [];
            sortedPaths.forEach(path => {
                this.sourcesSorted({ path: this.root().resolve(path).path(), exclude }).forEach(src => {
                    if (sources.indexOf(src) === -1)
                        sources.push(src);
                });
            });
            return sources;
        }
        tsOptions() {
            const rawOptions = JSON.parse(this.root().resolve('tsconfig.json').content()).compilerOptions;
            const res = $node['typescript'].convertCompilerOptionsFromJson(rawOptions, ".", 'tsconfig.json');
            if (res.errors.length)
                throw res.errors;
            return res.options;
        }
        tsSource({ path, target }) {
            const content = $.$mol_file.absolute(path).content().toString();
            return $node['typescript'].createSourceFile(path, content, target);
        }
        tsHost() {
            const host = {
                getScriptVersion: (path) => $.$mol_file.absolute(path).version(),
                getScriptSnapshot: (path) => $.$mol_file.absolute(path).content().toString(),
                getCurrentDirectory: () => this.root().path(),
                getCompilationSettings: () => this.tsOptions(),
                useCaseSensitiveFileNames: () => false,
                getCanonicalFileName: (path) => path.toLowerCase(),
                getDefaultLibFileName: (options) => $node['typescript'].getDefaultLibFilePath(options),
                getCommonSourceDirectory: () => this.root().path(),
                getNewLine: () => '\n',
                getSourceFile: (path, target, fail) => {
                    return this.tsSource({ path, target });
                },
                fileExists: (path) => {
                    return $.$mol_file.absolute(path).exists();
                },
                writeFile: (path, content) => {
                    $.$mol_file.absolute(path).content(content, $.$mol_atom_force_cache);
                },
            };
            return host;
        }
        tsProgram({ path, exclude }) {
            var host = this.tsHost();
            var options = host.getCompilationSettings();
            var paths = this.sourcesAll({ path, exclude }).filter(src => /tsx?$/.test(src.ext())).map(src => src.path());
            var program = $node['typescript'].createProgram(paths, options, host);
            return program;
        }
        sourcesJS({ path, exclude }) {
            var sources = this.sourcesAll({ path, exclude })
                .filter(src => /(js|tsx?)$/.test(src.ext()));
            if (!sources.length)
                return [];
            var sourcesTS = [];
            sources = sources.map(src => {
                if (!/tsx?$/.test(src.ext()))
                    return src;
                sourcesTS.push(src);
                return src.parent().resolve(src.name().replace(/\.tsx?$/, '.js'));
            });
            if (sourcesTS.length) {
                var host = this.tsHost();
                var options = host.getCompilationSettings();
                var program = this.tsProgram({ path, exclude });
                var result = program.emit();
                var errors = $node['typescript'].getPreEmitDiagnostics(program).concat(result.diagnostics);
                var logs = errors.map(error => {
                    var message = $node['typescript'].flattenDiagnosticMessageText(error.messageText, '\n');
                    if (!error.file)
                        return message;
                    var pos = error.file.getLineAndCharacterOfPosition(error.start);
                    return error.file.fileName + ':' + (pos.line + 1) + ':' + pos.character + '\n ' + message;
                });
                if (logs.length)
                    throw new Error('\n' + logs.join('\n'));
            }
            return sources;
        }
        sourcesDTS({ path, exclude }) {
            let sources = this.sourcesAll({ path, exclude });
            sources = sources.filter(src => /(tsx?)$/.test(src.ext()));
            sources = sources.map(src => src.parent().resolve(src.name().replace(/(\.d)?\.tsx?$/, '.d.ts')));
            return sources;
        }
        sourcesCSS({ path, exclude }) {
            return this.sourcesAll({ path, exclude }).filter(src => /(css)$/.test(src.ext()));
        }
        srcDeps(path) {
            const src = $.$mol_file.absolute(path);
            let ext = src.ext();
            if (!ext)
                return {};
            let dependencies;
            while (!dependencies) {
                dependencies = $mol_build.dependors[ext];
                if (dependencies)
                    break;
                var extShort = ext.replace(/^[^.]*\./, '');
                if (ext === extShort)
                    break;
                ext = extShort;
            }
            return dependencies ? dependencies(src) : {};
        }
        modDeps({ path, exclude }) {
            const mod = $.$mol_file.absolute(path);
            const depends = { '..': 0 };
            for (var src of this.sources({ path, exclude })) {
                $mol_build_depsMerge(depends, this.srcDeps(src.path()));
            }
            return depends;
        }
        dependencies({ path, exclude }) {
            var mod = $.$mol_file.absolute(path);
            switch (mod.type()) {
                case 'file':
                    return this.srcDeps(path);
                case 'dir':
                    return this.modDeps({ path, exclude });
                default:
                    return {};
            }
        }
        packEnsure(name) {
            var mapping = this.packMapping();
            var pack = this.root().resolve(name);
            if (pack.exists()) {
                if (pack.resolve('.git').exists()) {
                    try {
                        $.$mol_exec(pack.path(), 'git', '--no-pager', 'log', '--oneline', 'HEAD..origin/master');
                    }
                    catch (error) {
                        console.error(error.message);
                    }
                }
                return false;
            }
            for (let repo of mapping.select('pack', name, 'git').sub) {
                $.$mol_exec(this.root().path(), 'git', 'clone', repo.value, name);
                pack.stat(undefined, $.$mol_atom_force_cache);
                return true;
            }
            throw new Error(`Package "${name}" not found`);
        }
        modEnsure(path) {
            var file = $.$mol_file.absolute(path);
            var sub = file.relate(this.root());
            var name = sub.replace(/\/.*$/, '');
            return this.packEnsure(name).valueOf();
        }
        packMapping() {
            const file = $.$mol_file.relative('.pms.tree');
            return $.$mol_tree.fromString(file.content(), file.path());
        }
        graph({ path, exclude }) {
            let graph = new $.$mol_graph();
            let added = {};
            var addMod = (mod) => {
                if (added[mod.path()])
                    return;
                added[mod.path()] = true;
                graph.nodes[mod.relate(this.root())] = null;
                const checkDep = (p) => {
                    var dep = (p[0] === '/') ? this.root().resolve(p) : mod.resolve(p);
                    try {
                        this.modEnsure(dep.path());
                    }
                    catch (error) {
                        throw new Error(`${error.message}\nDependency "${dep.relate(this.root())}" from "${mod.relate(this.root())}" `);
                    }
                    while (!dep.exists())
                        dep = dep.parent();
                    if (dep.type() === 'dir') {
                        let index = dep.resolve('index.js');
                        if (index.exists())
                            dep = index;
                    }
                    if (mod === dep)
                        return;
                    if (dep === this.root())
                        return;
                    graph.link(mod.relate(this.root()), dep.relate(this.root()), { priority: deps[p] });
                    addMod(dep);
                };
                let deps = this.dependencies({ path: mod.path(), exclude });
                for (let p in deps) {
                    checkDep(p);
                    const p2 = p.replace(/^\/node\//, '/node_modules/');
                    if (p2 !== p)
                        checkDep(p2);
                }
            };
            this.modEnsure(path);
            addMod($.$mol_file.absolute(path));
            return graph;
        }
        bundle({ path, bundle }) {
            bundle = bundle && bundle.replace(/\.map$/, '');
            var envsDef = ['web', 'node'];
            var envs = bundle ? [] : envsDef.slice();
            var stages = ['test', 'dev'];
            if (bundle) {
                var [bundle, tags, type, locale] = /^(.*?)(?:\.(test\.js|js|css|deps\.json|locale=(\w+)\.json))?$/.exec(bundle);
                tags.split('.').forEach(tag => {
                    if (envsDef.indexOf(tag) !== -1)
                        envs = [tag];
                });
            }
            var res = [];
            envs.forEach(env => {
                var exclude = envsDef.filter(e => e !== env).concat(stages);
                if (!type || type === 'deps.json') {
                    res = res.concat(this.bundleDepsJSON({ path, exclude, bundle: env }));
                }
                if (!type || type === 'css') {
                    res = res.concat(this.bundleCSS({ path, exclude, bundle: env }));
                }
                if (!type || type === 'js') {
                    res = res.concat(this.bundleJS({ path, exclude, bundle: env }));
                }
                if (!type || type === 'test.js') {
                    res = res.concat(this.bundleTestJS({ path, exclude, bundle: env }));
                }
                if (!type || type === 'd.ts') {
                    res = res.concat(this.bundleDTS({ path, exclude, bundle: env }));
                }
                if (!type || type === 'view.tree') {
                    res = res.concat(this.bundleViewTree({ path, exclude, bundle: env }));
                }
                if (!type || /^locale=(\w+).json$/.test(type)) {
                    res = res.concat(this.bundleLocale({
                        path,
                        exclude,
                        bundle: env
                    }));
                }
            });
            if (!bundle || bundle === 'package.json') {
                res = res.concat(this.bundlePackageJSON({ path, exclude: ['web'] }));
            }
            res = res.concat(this.bundleFiles({ path, exclude: ['node'] }));
            res = res.concat(this.bundleCordova({ path, exclude: ['node'] }));
            return res.map(r => r.valueOf());
        }
        logBundle(target) {
            var time = new Date().toLocaleTimeString();
            var path = target.relate(this.root());
            console.log(`${time} Built ${path}`);
        }
        bundleJS({ path, exclude, bundle }) {
            var pack = $.$mol_file.absolute(path);
            var target = pack.resolve(`-/${bundle}.js`);
            var targetMap = pack.resolve(`-/${bundle}.js.map`);
            var sources = this.sourcesJS({ path, exclude });
            if (sources.length === 0)
                return [];
            var concater = new $node['concat-with-sourcemaps'](true, target.name(), '\n;\n');
            if (bundle === 'node') {
                concater.add('', 'require( "source-map-support" ).install(); var exports = void 0;\n');
            }
            sources.forEach((src) => {
                if (bundle === 'node') {
                    if (/node_modules\//.test(src.relate(this.root()))) {
                        return;
                    }
                }
                var content = src.content() ? src.content().toString().replace(/^\/\/#\ssourceMappingURL=/mg, '//') : '';
                var srcMap = src.parent().resolve(src.name() + '.map').content();
                if (srcMap) {
                    var map = JSON.parse(srcMap);
                    map.sourceRoot = src.parent().relate(target.parent());
                }
                const isCommonJs = /exports/.test(content);
                if (isCommonJs) {
                    concater.add('-', '\nvar $node = $node || {}\nvoid function( module ) { var exports = module.exports = this; function require( id ) { return $node[ id.replace( /^.\\// , "' + src.parent().relate(this.root().resolve('node_modules')) + '/" ) + ".js" ] }; \n');
                }
                concater.add(src.relate(target.parent()), content, map && JSON.stringify(map));
                if (isCommonJs) {
                    const idFull = src.relate(this.root().resolve('node_modules'));
                    const idShort = idFull.replace(/\/index\.js$/, '');
                    concater.add('-', `\n$${''}node[ "${idShort}" ] = $${''}node[ "${idFull}" ] = module.${''}exports }.call( {} , {} )\n`);
                }
            });
            target.content(concater.content + '\n//# sourceMappingURL=' + targetMap.relate(target.parent()));
            targetMap.content(concater.sourceMap);
            this.logBundle(target);
            return [target, targetMap];
        }
        bundleTestJS({ path, exclude, bundle }) {
            var pack = $.$mol_file.absolute(path);
            var root = this.root();
            var target = pack.resolve(`-/${bundle}.test.js`);
            var targetMap = pack.resolve(`-/${bundle}.test.js.map`);
            var concater = new $node['concat-with-sourcemaps'](true, target.name(), '\n;\n');
            var sources = this.sourcesJS({ path, exclude: exclude.filter(ex => ex !== 'test' && ex !== 'dev') });
            if (bundle === 'node') {
                concater.add('', 'require( "source-map-support" ).install()\n');
            }
            else {
                var sourcesNoTest = this.sourcesJS({ path, exclude });
                sources = sources.filter(src => sourcesNoTest.indexOf(src) === -1);
            }
            if (sources.length === 0)
                return [];
            sources.forEach(function (src) {
                if (bundle === 'node') {
                    if (/node_modules\//.test(src.relate(root))) {
                        return;
                    }
                }
                var content = src.content().toString().replace(/^\/\/#\ssourceMappingURL=/mg, '//');
                var srcMap = src.parent().resolve(src.name() + '.map').content();
                if (srcMap) {
                    var map = JSON.parse(srcMap);
                    map.sourceRoot = src.parent().relate(target.parent());
                }
                concater.add(src.relate(target.parent()), content, map && JSON.stringify(map));
            });
            target.content(concater.content + '\n//# sourceMappingURL=' + targetMap.relate(target.parent()));
            targetMap.content(concater.sourceMap);
            this.logBundle(target);
            return [target, targetMap];
        }
        bundleDTS({ path, exclude, bundle }) {
            var pack = $.$mol_file.absolute(path);
            var target = pack.resolve(`-/${bundle}.d.ts`);
            var sources = this.sourcesDTS({ path, exclude });
            if (sources.length === 0)
                return [];
            var concater = new $node['concat-with-sourcemaps'](true, target.name());
            sources.forEach(function (src) {
                var content = src.content().toString();
                concater.add(src.relate(target.parent()), content);
            });
            target.content(concater.content);
            this.logBundle(target);
            return [target];
        }
        bundleViewTree({ path, exclude, bundle }) {
            var pack = $.$mol_file.absolute(path);
            var target = pack.resolve(`-/${bundle}.view.tree`);
            var sources = this.sourcesAll({ path, exclude })
                .filter(src => /view.tree$/.test(src.ext()));
            if (sources.length === 0)
                return [];
            target.content(sources.map(src => src.content().toString()).join('\n'));
            this.logBundle(target);
            return [target];
        }
        bundlePackageJSON({ path, exclude }) {
            var pack = $.$mol_file.absolute(path);
            var target = pack.resolve(`-/package.json`);
            var targetMap = pack.resolve(`-/package.json`);
            var sources = this.sourcesAll({ path, exclude: exclude.filter(ex => ex !== 'test' && ex !== 'dev') });
            var json = {
                name: pack.relate(this.root()).replace(/\//g, '_'),
                version: '0.0.0',
                main: 'node.js',
                dependencies: {}
            };
            for (let src of sources) {
                let deps = this.srcDeps(src.path());
                for (let dep in deps) {
                    if (!/^\/node(?:_modules)?\//.test(dep))
                        continue;
                    let mod = dep.replace(/^\/node(?:_modules)?\//, '').replace(/\/.*/g, '');
                    json.dependencies[mod] = `*`;
                }
            }
            target.content(JSON.stringify(json, null, '  '));
            this.logBundle(target);
            return [target];
        }
        bundleFiles({ path, exclude }) {
            const root = this.root();
            const pack = $.$mol_file.absolute(path);
            var sources = this.sourcesAll({ path, exclude })
                .filter(src => /meta.tree$/.test(src.ext()));
            if (sources.length === 0)
                return [];
            const targets = [];
            sources.forEach(source => {
                const tree = $.$mol_tree.fromString(source.content(), source.path());
                tree.select('deploy').sub.forEach(deploy => {
                    const file = root.resolve(deploy.value.replace(/^\//, ''));
                    const target = pack.resolve(`-/${file.relate(root)}`);
                    target.content(file.content());
                    targets.push(target);
                    this.logBundle(target);
                });
            });
            return targets;
        }
        bundleCordova({ path, exclude }) {
            const pack = $.$mol_file.absolute(path);
            const cordova = pack.resolve('-cordova');
            const config = pack.resolve('config.xml');
            if (!config.exists())
                return [];
            const config_target = cordova.resolve('config.xml');
            config_target.content(config.content());
            const html = pack.resolve('index.html');
            const html_target = cordova.resolve('www/index.html');
            html_target.content(html.content());
            const sources = pack.resolve('-').find().filter(src => src.type() === 'file');
            const targets = [config_target, html_target]
                .concat(sources.map(source => {
                const target = cordova.resolve(`www/${source.relate(pack)}`);
                target.content(source.content());
                return target;
            }));
            this.logBundle(cordova);
            return targets;
        }
        bundleCSS({ path, exclude, bundle }) {
            if (bundle === 'node')
                return [];
            var pack = $.$mol_file.absolute(path);
            var sources = this.sourcesCSS({ path, exclude });
            if (!sources.length)
                return [];
            var target = pack.resolve(`-/${bundle}.css`);
            var targetMap = pack.resolve(`-/${bundle}.css.map`);
            var root = null;
            sources.forEach(src => {
                var root2 = $node['postcss'].parse(src.content(), { from: src.path() });
                root = root ? root.append(root2) : root2;
            });
            var cssnext = $node['postcss-cssnext'];
            var processor = $node['postcss'](cssnext(null, {
                features: {
                    customProperties: {
                        preserve: true
                    }
                }
            }).plugins);
            var result = processor.process(root, { to: target.relate(), map: { inline: false } });
            target.content(result.css);
            targetMap.content(JSON.stringify(result.map, null, '\t'));
            this.logBundle(target);
            return [target, targetMap];
        }
        bundleLocale({ path, exclude, bundle }) {
            const pack = $.$mol_file.absolute(path);
            const sources = this.sourcesAll({ path, exclude }).filter(src => /(locale=(\w+)\.json)$/.test(src.name()));
            if (!sources.length)
                return [];
            const locales = {};
            sources.forEach(src => {
                const [ext, lang] = /locale=(\w+)\.json$/.exec(src.name());
                if (!locales[lang])
                    locales[lang] = {};
                const loc = JSON.parse(src.content());
                for (let key in loc) {
                    locales[lang][key] = loc[key];
                }
            });
            const targets = Object.keys(locales).map(lang => {
                const target = pack.resolve(`-/${bundle}.locale=${lang}.json`);
                const locale = locales[lang];
                if (lang !== 'en' && locales['en']) {
                    for (let key in locale) {
                        if (key in locales['en'])
                            continue;
                        console.warn(`Not translated to "en": ${key}`);
                    }
                }
                const locale_sorted = {};
                for (let key of Object.keys(locale).sort()) {
                    locale_sorted[key] = locale[key];
                }
                target.content(JSON.stringify(locale_sorted, null, '\t'));
                this.logBundle(target);
                return target;
            });
            return targets;
        }
        bundleDepsJSON({ path, exclude, bundle }) {
            var pack = $.$mol_file.absolute(path);
            var list = this.sourcesAll({ path, exclude });
            if (!list.length)
                return [];
            var graph = this.graph({ path, exclude });
            var deps = {};
            for (let dep in graph.nodes) {
                deps[dep] = this.dependencies({ path: this.root().resolve(dep).path(), exclude });
            }
            var data = {
                files: list.map(src => src.relate(this.root())),
                edgesIn: graph.edgesIn,
                edgesOut: graph.edgesOut,
                deps
            };
            var target = pack.resolve(`-/${bundle}.deps.json`);
            target.content(JSON.stringify(data));
            this.logBundle(target);
            return [target];
        }
    }
    $mol_build.dependors = {};
    __decorate([
        $.$mol_mem
    ], $mol_build.prototype, "server", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "mods", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "modsRecursive", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "sources", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "sourcesSorted", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "sourcesAll", null);
    __decorate([
        $.$mol_mem
    ], $mol_build.prototype, "tsOptions", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "tsSource", null);
    __decorate([
        $.$mol_mem
    ], $mol_build.prototype, "tsHost", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "sourcesJS", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "sourcesDTS", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "sourcesCSS", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "srcDeps", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "modDeps", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "dependencies", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "packEnsure", null);
    __decorate([
        $.$mol_mem
    ], $mol_build.prototype, "packMapping", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "graph", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "bundle", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "bundleJS", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "bundleTestJS", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "bundleDTS", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "bundleViewTree", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "bundlePackageJSON", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "bundleFiles", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "bundleCordova", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "bundleCSS", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "bundleLocale", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build.prototype, "bundleDepsJSON", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_build, "root", null);
    $.$mol_build = $mol_build;
    function $mol_build_depsMerge(target, source) {
        for (var path in source) {
            if (target[path] >= source[path])
                continue;
            target[path] = source[path];
        }
        return target;
    }
    $mol_build.dependors['js'] = source => {
        var depends = {};
        var lines = String(source.content())
            .replace(/\/\*[^]*?\*\//g, '')
            .replace(/\/\/.*$/gm, '')
            .split('\n');
        lines.forEach(function (line) {
            var indent = /^([\s\t]*)/.exec(line);
            var priority = -indent[0].replace(/\t/g, '    ').length / 4;
            line.replace(/require\(\s*['"](.*?)['"]\s*\)/ig, (str, path) => {
                if (!/\.[^\/]$/.test(path))
                    path += '.js';
                if (path[0] === '.')
                    path = '../' + path;
                $mol_build_depsMerge(depends, { [path]: priority });
                return str;
            });
        });
        return depends;
    };
    $mol_build.dependors['ts'] = $mol_build.dependors['tsx'] = $mol_build.dependors['jam.js'] = source => {
        var depends = {};
        if (/[jt]sx$/.test(source.ext())) {
            depends['/mol/dom/jsx'] = 0;
        }
        var lines = String(source.content())
            .replace(/\/\*[^]*?\*\//g, '')
            .replace(/\/\/.*$/gm, '')
            .split('\n');
        lines.forEach(function (line) {
            var indent = /^([\s\t]*)/.exec(line);
            var priority = -indent[0].replace(/\t/g, '    ').length / 4;
            line.replace(/\$\.?(([a-z][a-z0-9]+)(?:[._][a-z0-9]+|\[\s*['"](?:[^\/]*?)['"]\s*\])*)/ig, (str, name, pack) => {
                if (pack === 'node')
                    return str;
                $mol_build_depsMerge(depends, { ['/' + name.replace(/[_.\[\]'"]+/g, '/')]: priority });
                return str;
            });
            line.replace(/\$node\[\s*['"](.*?)['"]\s*\]/ig, (str, path) => {
                $mol_build_depsMerge(depends, { ['/node/' + path]: priority });
                return str;
            });
            line.replace(/require\(\s*['"](.*?)['"]\s*\)/ig, (str, path) => {
                $mol_build_depsMerge(depends, { [path]: priority });
                return str;
            });
        });
        return depends;
    };
    $mol_build.dependors['view.ts'] = source => {
        var treeName = source.name().replace(/ts$/, 'tree');
        var depends = { [treeName]: 0 };
        $mol_build_depsMerge(depends, $mol_build.dependors['ts'](source));
        return depends;
    };
    $mol_build.dependors['css'] = $mol_build.dependors['view.css'] = source => {
        var depends = {};
        var lines = String(source.content())
            .replace(/\/\*[^]*?\*\//g, '')
            .replace(/\/\/.*$/gm, '')
            .split('\n');
        lines.forEach(function (line) {
            var indent = /^([\s\t]*)/.exec(line);
            var priority = -indent[0].replace(/\t/g, '    ').length / 4;
            line.replace(/(?:--|[\[\.#])([a-z][a-z0-9]+(?:[-_][a-z0-9]+)+)/ig, (str, name) => {
                $mol_build_depsMerge(depends, { ['/' + name.replace(/[._-]/g, '/')]: priority });
                return str;
            });
        });
        return depends;
    };
    $mol_build.dependors['meta.tree'] = source => {
        const depends = {};
        const tree = $.$mol_tree.fromString(source.content(), source.path());
        tree.select('require').sub.forEach(leaf => {
            depends[leaf.value] = 0;
        });
        tree.select('include').sub.forEach(leaf => {
            depends[leaf.value] = Number.NEGATIVE_INFINITY;
        });
        return depends;
    };
})($ || ($ = {}));
//build.node.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $mol_server extends $.$mol_object {
        express() {
            var express = $node['express']();
            this.expressHandlers().forEach(plugin => express.use(plugin));
            $node['portastic'].find({
                min: this.port(),
                max: this.port() + 1000,
                retrieve: 1
            }).then((ports) => {
                express.listen(ports[0]);
                console.log(this.messageStart(ports[0]));
            });
            return express;
        }
        messageStart(port) {
            return `${this} started at http://127.0.0.1:${port}/`;
        }
        expressHandlers() {
            return [].concat.apply([], [
                this.expressCompressor(),
                this.expressBodier(),
                this.expressGenerator(),
                this.expressFiler(),
                this.expressDirector(),
            ]);
        }
        expressCompressor() {
            return $node['compression']();
        }
        expressBodier() {
            return $node['body-parser'].json({
                limit: this.bodyLimit()
            });
        }
        expressFiler() {
            return $node['express'].static($node.path.resolve(this.rootPublic()), {
                maxAge: this.cacheTime()
            });
        }
        expressDirector() {
            return $node['serve-index'](this.rootPublic(), { icons: true });
        }
        expressGenerator() {
            return (req, res, next) => next();
        }
        bodyLimit() {
            return '1mb';
        }
        cacheTime() {
            return 1000 * 60 * 60 * 24 * 365 * 1000;
        }
        port() {
            return 80;
        }
        rootPublic() {
            return '.';
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_server.prototype, "express", null);
    $.$mol_server = $mol_server;
})($ || ($ = {}));
//server.node.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $mol_build_server extends $.$mol_server {
        expressGenerator() {
            return (req, res, next) => {
                try {
                    return this.generator(req.url).valueOf() && next();
                }
                catch (error) {
                    if (req.url.match(/\.js$/)) {
                        res.send(`console.error( ${JSON.stringify(error.message)} )`).end();
                    }
                    else if (req.url.match(/\.css$/)) {
                        const message = JSON.stringify(error.message.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, ''))
                            .replace(/\\n/g, '\\a')
                            .replace(/\\t/g, '\\9');
                        res.setHeader('content-type', 'text/css');
                        res.send(`body:before{ display: block; font: 1em monospace; white-space: pre-wrap; color: red; content : ${message} }`).end();
                    }
                    else {
                        throw error;
                    }
                }
            };
        }
        build() {
            return null;
        }
        generator(path) {
            var matched = path.match(/^((?:\/\w+)+)\/-\/(\w+(?:.\w+)+)$/);
            if (!matched)
                return [];
            var build = this.build();
            var [path, path, bundle] = matched;
            path = build.root().resolve(path).path();
            return build.bundle({ path, bundle });
        }
        port() {
            return 8080;
        }
    }
    __decorate([
        $.$mol_mem_key
    ], $mol_build_server.prototype, "generator", null);
    $.$mol_build_server = $mol_build_server;
})($ || ($ = {}));
//server.node.js.map
//# sourceMappingURL=node.test.js.map