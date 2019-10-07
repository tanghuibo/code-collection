import Vue from 'vue'
import VueCodeMirror from 'vue-codemirror';
import 'codemirror/lib/codemirror.css'

// language js
import 'codemirror/mode/javascript/javascript.js'
// theme css
import 'codemirror/theme/eclipse.css'

Vue.use(VueCodeMirror,{});
