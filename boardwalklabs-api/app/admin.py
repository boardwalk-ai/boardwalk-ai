"""Minimal admin SPA served at /sakuracloud — vanilla JS, no build step."""

from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse

router = APIRouter(tags=["admin"])

ADMIN_HTML = r"""<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>sakuracloud — Boardwalk Labs admin</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#0d0f13;--surface:#14161c;--border:#1e2028;--text:#e8e6e1;--mute:#6b6860;
  --accent:#e32400;--accent2:#d5a637;--green:#22c55e;--blue:#3d7cf5;--mono:"JetBrains Mono",monospace;--sans:"Inter Tight",system-ui,sans-serif}
body{font-family:var(--sans);background:var(--bg);color:var(--text);font-size:14px;line-height:1.5}
a{color:var(--accent);text-decoration:none}
button,input,select,textarea{font:inherit;color:inherit;background:var(--surface);border:1px solid var(--border);border-radius:6px;padding:8px 12px;outline:none}
button{cursor:pointer;font-weight:500;transition:background .15s}
button:hover{background:#1a1c24}
button.primary{background:var(--accent);border-color:var(--accent);color:#fff}
button.primary:hover{background:#c91f00}
input:focus,textarea:focus,select:focus{border-color:var(--accent)}
textarea{resize:vertical;min-height:80px}
.container{max-width:960px;margin:0 auto;padding:24px 20px}
.header{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid var(--border);position:sticky;top:0;z-index:50;background:var(--bg)}
.header h1{font-size:13px;font-family:var(--mono);letter-spacing:.12em;color:var(--accent2)}
.nav{display:flex;gap:6px}
.nav button{font-size:12px;padding:6px 14px;border-radius:20px;font-family:var(--mono);letter-spacing:.05em}
.nav button.active{background:var(--accent);border-color:var(--accent);color:#fff}
.login-wrap{display:flex;flex-direction:column;align-items:center;justify-content:center;height:80vh;gap:16px}
.login-wrap input{width:320px;text-align:center}
.login-wrap h2{font-family:var(--mono);font-size:12px;letter-spacing:.15em;color:var(--mute)}
table{width:100%;border-collapse:collapse;margin:16px 0}
th,td{text-align:left;padding:10px 12px;border-bottom:1px solid var(--border)}
th{font-size:11px;font-family:var(--mono);letter-spacing:.1em;color:var(--mute);font-weight:500}
td{font-size:13px}
.badge{display:inline-block;padding:2px 8px;border-radius:10px;font-size:11px;font-family:var(--mono);letter-spacing:.05em}
.badge.new{background:#22c55e22;color:var(--green)}
.badge.improved{background:#3d7cf522;color:var(--blue)}
.badge.fixed{background:#e3240022;color:var(--accent)}
.badge.pub{background:#22c55e22;color:var(--green)}
.badge.draft{background:#e3240022;color:var(--accent)}
.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:16px 0}
.form-grid.full{grid-template-columns:1fr}
label{font-size:11px;font-family:var(--mono);letter-spacing:.08em;color:var(--mute);display:block;margin-bottom:4px}
.actions{display:flex;gap:8px;margin:16px 0;justify-content:flex-end}
.block-editor{margin:12px 0;border:1px solid var(--border);border-radius:8px;overflow:hidden}
.block-item{display:flex;gap:8px;align-items:flex-start;padding:10px 12px;border-bottom:1px solid var(--border)}
.block-item:last-child{border-bottom:none}
.block-item select{width:90px;font-size:12px;padding:4px 6px}
.block-item textarea{flex:1;min-height:40px;font-size:13px}
.block-item button{padding:4px 8px;font-size:11px}
.empty{text-align:center;padding:40px;color:var(--mute);font-family:var(--mono);font-size:12px;letter-spacing:.1em}
.toast{position:fixed;bottom:24px;right:24px;background:var(--green);color:#fff;padding:10px 20px;border-radius:8px;font-size:13px;font-weight:500;z-index:100;opacity:0;transition:opacity .3s}
.toast.show{opacity:1}
.toast.error{background:var(--accent)}
</style>
</head>
<body>
<div id="app"></div>
<div id="toast" class="toast"></div>
<script>
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
let TOKEN = localStorage.getItem('sakura_token') || '';
let VIEW = 'posts';

function api(path, opts = {}) {
  const h = { 'Content-Type': 'application/json', ...opts.headers };
  if (TOKEN) h['Authorization'] = 'Bearer ' + TOKEN;
  return fetch(path, { ...opts, headers: h }).then(async r => {
    const j = r.headers.get('content-type')?.includes('json') ? await r.json() : null;
    if (!r.ok) throw new Error(j?.detail || r.statusText);
    return j;
  });
}

function toast(msg, err) {
  const t = $('#toast');
  t.textContent = msg;
  t.className = 'toast show' + (err ? ' error' : '');
  setTimeout(() => t.className = 'toast', 2500);
}

function render() {
  if (!TOKEN) return renderLogin();
  const app = $('#app');
  app.innerHTML = `
    <div class="header">
      <h1>◆ SAKURACLOUD</h1>
      <div class="nav">
        <button class="${VIEW==='posts'?'active':''}" onclick="VIEW='posts';render()">POSTS</button>
        <button class="${VIEW==='changelog'?'active':''}" onclick="VIEW='changelog';render()">CHANGELOG</button>
        <button class="${VIEW==='authors'?'active':''}" onclick="VIEW='authors';render()">AUTHORS</button>
        <button onclick="TOKEN='';localStorage.removeItem('sakura_token');render()">LOGOUT</button>
      </div>
    </div>
    <div class="container" id="content"></div>`;
  if (VIEW === 'posts') loadPosts();
  else if (VIEW === 'changelog') loadChangelog();
  else if (VIEW === 'authors') loadAuthors();
}

function renderLogin() {
  $('#app').innerHTML = `
    <div class="login-wrap">
      <h2>◆ SAKURACLOUD</h2>
      <input id="tok" type="password" placeholder="admin token" onkeydown="if(event.key==='Enter')doLogin()">
      <button class="primary" onclick="doLogin()">Enter</button>
    </div>`;
  setTimeout(() => { const i = $('#tok'); if (i) i.focus(); }, 50);
}

function doLogin() {
  TOKEN = $('#tok').value.trim();
  localStorage.setItem('sakura_token', TOKEN);
  api('/api/posts?published_only=false').then(() => render()).catch(() => {
    TOKEN = ''; localStorage.removeItem('sakura_token');
    toast('Invalid token', true); render();
  });
}

// ── Posts ────────────────────────────────────────
let posts = [], editingPost = null;

async function loadPosts() {
  posts = await api('/api/posts?published_only=false');
  renderPostsList();
}

function renderPostsList() {
  const c = $('#content');
  c.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
      <h2 style="font-size:16px">Blog Posts</h2>
      <button class="primary" onclick="startNewPost()">+ New Post</button>
    </div>
    ${posts.length ? `<table><thead><tr><th>TITLE</th><th>SLUG</th><th>CAT</th><th>STATUS</th><th></th></tr></thead><tbody>
      ${posts.map(p => `<tr>
        <td><strong>${esc(p.title)}</strong></td>
        <td style="font-family:var(--mono);font-size:12px">${esc(p.slug)}</td>
        <td><span class="badge">${p.cat}</span></td>
        <td><span class="badge ${p.published?'pub':'draft'}">${p.published?'PUBLISHED':'DRAFT'}</span></td>
        <td><button onclick='editPost(${JSON.stringify(p.slug)})'>Edit</button> <button onclick='deletePost(${JSON.stringify(p.slug)})'>Del</button></td>
      </tr>`).join('')}
    </tbody></table>` : '<div class="empty">NO POSTS YET</div>'}`;
}

async function startNewPost() {
  editingPost = { slug: '', title: '', excerpt: '', cat: 'COMPANY', issue: '001', read_time: '5 min', date: '', featured: false, gradient: 'linear-gradient(135deg,#1a1f2e 0%,#0d1018 100%)', accent_color: '#3d7cf5', published: false, author_id: null, body: [] };
  await renderPostForm();
}

async function editPost(slug) {
  editingPost = await api('/api/posts/' + encodeURIComponent(slug));
  await renderPostForm();
}

async function deletePost(slug) {
  if (!confirm('Delete "' + slug + '"?')) return;
  await api('/api/posts/' + encodeURIComponent(slug), { method: 'DELETE' });
  toast('Deleted'); loadPosts();
}

async function renderPostForm() {
  let authorOpts = [];
  try {
    authorOpts = await api('/api/authors');
  } catch (e) { authorOpts = []; }
  const p = editingPost;
  const isNew = !p.id;
  const c = $('#content');
  const authorSelect = '<option value="">— None —</option>' + authorOpts.map(a =>
    `<option value="${a.id}" ${Number(p.author_id) === a.id ? 'selected' : ''}>${esc(a.name)} (#${a.id})</option>`
  ).join('');
  c.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
      <h2 style="font-size:16px">${isNew ? 'New Post' : 'Edit: ' + esc(p.title)}</h2>
      <button onclick="editingPost=null;renderPostsList()">← Back</button>
    </div>
    <div class="form-grid">
      <div><label>TITLE</label><input id="pf_title" value="${esc(p.title)}" style="width:100%"></div>
      <div><label>SLUG</label><input id="pf_slug" value="${esc(p.slug)}" style="width:100%"></div>
      <div style="grid-column:1/-1"><label>EXCERPT</label><textarea id="pf_excerpt" rows="2">${esc(p.excerpt)}</textarea></div>
      <div><label>CATEGORY</label><select id="pf_cat">${['PRODUCT','EDUCATION','ENGINEERING','COMPANY'].map(c=>`<option ${p.cat===c?'selected':''}>${c}</option>`).join('')}</select></div>
      <div><label>ISSUE</label><input id="pf_issue" value="${esc(p.issue)}"></div>
      <div><label>READ TIME</label><input id="pf_read_time" value="${esc(p.read_time)}"></div>
      <div><label>DATE</label><input id="pf_date" value="${esc(p.date)}"></div>
      <div><label>GRADIENT</label><input id="pf_gradient" value="${esc(p.gradient)}" style="width:100%"></div>
      <div><label>ACCENT COLOR</label><input id="pf_accent_color" value="${esc(p.accent_color)}"></div>
      <div style="grid-column:1/-1"><label>AUTHOR</label><select id="pf_author_id" style="width:100%;max-width:420px">${authorSelect}</select><div style="font-size:11px;color:var(--mute);margin-top:4px">Create authors under AUTHORS tab first.</div></div>
      <div style="display:flex;gap:16px;align-items:center">
        <label><input type="checkbox" id="pf_published" ${p.published?'checked':''}> Published</label>
        <label><input type="checkbox" id="pf_featured" ${p.featured?'checked':''}> Featured</label>
      </div>
    </div>
    <label>BODY BLOCKS</label>
    <div class="block-editor" id="blocks"></div>
    <button onclick="addBlock()" style="margin-top:8px">+ Add Block</button>
    <div style="margin-top:12px"><label>UPLOAD IMAGE</label><input type="file" id="pf_upload" accept="image/*" onchange="uploadImg()"><span id="upload_status" style="margin-left:8px;font-size:12px;color:var(--mute)"></span></div>
    <div class="actions">
      <button onclick="editingPost=null;renderPostsList()">Cancel</button>
      <button class="primary" onclick="savePost(${isNew?'true':'false'})">${isNew ? 'Create' : 'Save'}</button>
    </div>`;
  renderBlocks();
}

function renderBlocks() {
  const el = $('#blocks');
  const blocks = editingPost.body || [];
  if (!blocks.length) { el.innerHTML = '<div class="empty">NO BLOCKS — click + Add Block</div>'; return; }
  el.innerHTML = blocks.map((b, i) => `<div class="block-item">
    <select onchange="editingPost.body[${i}].type=this.value;renderBlocks()">
      ${['p','h2','h3','quote','image','code','list','divider'].map(t=>`<option ${b.type===t?'selected':''}>${t}</option>`).join('')}
    </select>
    ${b.type==='divider' ? '<span style="color:var(--mute);font-size:12px">— divider —</span>'
      : b.type==='image' ? `<div style="flex:1;display:grid;gap:4px"><input placeholder="url" value="${esc(b.url||'')}" onchange="editingPost.body[${i}].url=this.value"><input placeholder="caption" value="${esc(b.caption||'')}" onchange="editingPost.body[${i}].caption=this.value"></div>`
      : b.type==='list' ? `<textarea style="flex:1" placeholder="one item per line" onchange="editingPost.body[${i}].items=this.value.split('\\n').filter(Boolean)">${(b.items||[]).join('\\n')}</textarea>`
      : b.type==='code' ? `<div style="flex:1;display:grid;gap:4px"><input placeholder="lang" value="${esc(b.lang||'')}" onchange="editingPost.body[${i}].lang=this.value" style="width:100px"><textarea style="font-family:var(--mono);font-size:12px" onchange="editingPost.body[${i}].text=this.value">${esc(b.text||'')}</textarea></div>`
      : `<textarea onchange="editingPost.body[${i}].text=this.value">${esc(b.text||'')}</textarea>`}
    <div style="display:flex;flex-direction:column;gap:2px">
      ${i>0?`<button onclick="swapBlock(${i},${i-1})">↑</button>`:''}
      ${i<blocks.length-1?`<button onclick="swapBlock(${i},${i+1})">↓</button>`:''}
      <button onclick="editingPost.body.splice(${i},1);renderBlocks()">×</button>
    </div>
  </div>`).join('');
}

function addBlock() { editingPost.body.push({ type: 'p', text: '' }); renderBlocks(); }
function swapBlock(a, b) { const t = editingPost.body[a]; editingPost.body[a] = editingPost.body[b]; editingPost.body[b] = t; renderBlocks(); }

async function uploadImg() {
  const f = $('#pf_upload').files[0]; if (!f) return;
  const fd = new FormData(); fd.append('file', f);
  $('#upload_status').textContent = 'Uploading...';
  try {
    const r = await fetch('/api/upload', { method: 'POST', headers: { 'Authorization': 'Bearer ' + TOKEN }, body: fd });
    const j = await r.json(); if (!r.ok) throw new Error(j.detail);
    $('#upload_status').textContent = j.url;
    navigator.clipboard?.writeText(j.url);
    toast('Uploaded — URL copied');
  } catch(e) { $('#upload_status').textContent = ''; toast(e.message, true); }
}

async function savePost(isNew) {
  const d = {
    title: $('#pf_title').value, slug: $('#pf_slug').value, excerpt: $('#pf_excerpt').value,
    cat: $('#pf_cat').value, issue: $('#pf_issue').value, read_time: $('#pf_read_time').value,
    date: $('#pf_date').value, gradient: $('#pf_gradient').value, accent_color: $('#pf_accent_color').value,
    published: $('#pf_published').checked, featured: $('#pf_featured').checked,
    author_id: ($('#pf_author_id').value === '' || $('#pf_author_id').value === null) ? null : Number($('#pf_author_id').value),
    body: editingPost.body
  };
  try {
    if (isNew) await api('/api/posts', { method: 'POST', body: JSON.stringify(d) });
    else await api('/api/posts/' + encodeURIComponent(editingPost.slug), { method: 'PUT', body: JSON.stringify(d) });
    toast(isNew ? 'Created' : 'Saved');
    editingPost = null; loadPosts();
  } catch(e) { toast(e.message, true); }
}

// ── Changelog ────────────────────────────────────
let clEntries = [], editingCL = null;

async function loadChangelog() {
  clEntries = await api('/api/changelog');
  renderCLList();
}

function renderCLList() {
  const c = $('#content');
  c.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
      <h2 style="font-size:16px">Changelog</h2>
      <button class="primary" onclick="editingCL={version:'',full_version:'',date:'',status:null,summary:'',released_at:null,changes:[]};renderCLForm()">+ New Entry</button>
    </div>
    ${clEntries.length ? `<table><thead><tr><th>VERSION</th><th>DATE</th><th>STATUS</th><th>CHANGES</th><th></th></tr></thead><tbody>
      ${clEntries.map(e => `<tr>
        <td style="font-family:var(--mono)">${esc(e.full_version)}</td>
        <td>${esc(e.date)}</td>
        <td>${e.status?`<span class="badge">${e.status}</span>`:'-'}</td>
        <td>${e.changes.length}</td>
        <td><button onclick='editCL(${JSON.stringify(e.full_version)})'>Edit</button></td>
      </tr>`).join('')}
    </tbody></table>` : '<div class="empty">NO CHANGELOG ENTRIES</div>'}`;
}

async function editCL(fv) { editingCL = await api('/api/changelog/' + encodeURIComponent(fv)); renderCLForm(); }

function renderCLForm() {
  const e = editingCL, isNew = !e.id;
  $('#content').innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
      <h2 style="font-size:16px">${isNew ? 'New Entry' : 'Edit: ' + esc(e.full_version)}</h2>
      <button onclick="editingCL=null;renderCLList()">← Back</button>
    </div>
    <div class="form-grid">
      <div><label>VERSION</label><input id="cf_version" value="${esc(e.version)}"></div>
      <div><label>FULL VERSION</label><input id="cf_full_version" value="${esc(e.full_version)}"></div>
      <div><label>DATE</label><input id="cf_date" value="${esc(e.date)}"></div>
      <div><label>STATUS</label><select id="cf_status"><option value="">—</option>${['LATEST','INITIAL'].map(s=>`<option ${e.status===s?'selected':''}>${s}</option>`).join('')}</select></div>
      <div style="grid-column:1/-1"><label>SUMMARY</label><textarea id="cf_summary" rows="2">${esc(e.summary)}</textarea></div>
      <div><label>RELEASED AT</label><input id="cf_released_at" type="date" value="${e.released_at||''}"></div>
    </div>
    <label>CHANGES</label>
    <div class="block-editor" id="cl_changes"></div>
    <button onclick="editingCL.changes.push({type:'new',text:'',order:editingCL.changes.length});renderCLChanges()" style="margin-top:8px">+ Add Change</button>
    <div class="actions">
      <button onclick="editingCL=null;renderCLList()">Cancel</button>
      <button class="primary" onclick="saveCL(${isNew})">${isNew?'Create':'Save'}</button>
    </div>`;
  renderCLChanges();
}

function renderCLChanges() {
  const el = $('#cl_changes'), ch = editingCL.changes;
  if (!ch.length) { el.innerHTML = '<div class="empty">NO CHANGES</div>'; return; }
  el.innerHTML = ch.map((c, i) => `<div class="block-item">
    <select onchange="editingCL.changes[${i}].type=this.value;renderCLChanges()">
      ${['new','improved','fixed'].map(t=>`<option ${c.type===t?'selected':''}>${t}</option>`).join('')}
    </select>
    <textarea onchange="editingCL.changes[${i}].text=this.value">${esc(c.text)}</textarea>
    <button onclick="editingCL.changes.splice(${i},1);renderCLChanges()">×</button>
  </div>`).join('');
}

async function saveCL(isNew) {
  const d = {
    version: $('#cf_version').value, full_version: $('#cf_full_version').value,
    date: $('#cf_date').value, status: $('#cf_status').value || null,
    summary: $('#cf_summary').value, released_at: $('#cf_released_at').value || null,
    changes: editingCL.changes
  };
  try {
    if (isNew) await api('/api/changelog', { method: 'POST', body: JSON.stringify(d) });
    else await api('/api/changelog/' + encodeURIComponent(editingCL.full_version), { method: 'PUT', body: JSON.stringify(d) });
    toast(isNew ? 'Created' : 'Saved');
    editingCL = null; loadChangelog();
  } catch(e) { toast(e.message, true); }
}

// ── Authors ──────────────────────────────────────
let authors = [], editingAuthor = null;

async function loadAuthors() {
  authors = await api('/api/authors');
  renderAuthorsList();
}

function renderAuthorsList() {
  const c = $('#content');
  c.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
      <h2 style="font-size:16px">Authors</h2>
      <button class="primary" onclick="editingAuthor={name:'',initials:'',color:'#e32400',bio:'',avatar_url:''};renderAuthorForm()">+ New Author</button>
    </div>
    ${authors.length ? `<table><thead><tr><th>ID</th><th></th><th>NAME</th><th>INITIALS</th><th>COLOR</th><th></th></tr></thead><tbody>
      ${authors.map(a => `<tr>
        <td style="font-family:var(--mono)">${a.id}</td>
        <td>${a.avatar_url ? `<img src="${esc(a.avatar_url)}" alt="" style="width:28px;height:28px;border-radius:50%;object-fit:cover">` : '—'}</td>
        <td>${esc(a.name)}</td>
        <td>${esc(a.initials)}</td>
        <td><span style="display:inline-block;width:14px;height:14px;border-radius:50%;background:${a.color};vertical-align:middle"></span> ${esc(a.color)}</td>
        <td><button onclick="editAuthor(${a.id})">Edit</button></td>
      </tr>`).join('')}
    </tbody></table>` : '<div class="empty">NO AUTHORS YET</div>'}`;
}

function editAuthor(id) { editingAuthor = authors.find(a => a.id === id); renderAuthorForm(); }

function renderAuthorForm() {
  const a = editingAuthor, isNew = !a.id;
  $('#content').innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
      <h2 style="font-size:16px">${isNew ? 'New Author' : 'Edit: ' + esc(a.name)}</h2>
      <button onclick="editingAuthor=null;renderAuthorsList()">← Back</button>
    </div>
    <div class="form-grid">
      <div><label>NAME</label><input id="af_name" value="${esc(a.name)}"></div>
      <div><label>INITIALS</label><input id="af_initials" value="${esc(a.initials)}"></div>
      <div><label>COLOR</label><input id="af_color" value="${esc(a.color)}"></div>
      <div style="grid-column:1/-1"><label>AVATAR URL</label><input id="af_avatar_url" value="${esc(a.avatar_url||'')}" placeholder="https://… or paste after upload" style="width:100%"></div>
      <div style="grid-column:1/-1"><label>UPLOAD AVATAR IMAGE</label><input type="file" id="af_upload" accept="image/*" onchange="uploadAuthorAvatar()"><span id="af_upload_status" style="margin-left:8px;font-size:12px;color:var(--mute)"></span></div>
      <div style="grid-column:1/-1"><label>BIO</label><textarea id="af_bio" rows="3">${esc(a.bio||'')}</textarea></div>
    </div>
    <div class="actions">
      <button onclick="editingAuthor=null;renderAuthorsList()">Cancel</button>
      <button class="primary" onclick="saveAuthor(${isNew})">${isNew?'Create':'Save'}</button>
    </div>`;
}

async function uploadAuthorAvatar() {
  const f = $('#af_upload').files[0]; if (!f) return;
  const fd = new FormData(); fd.append('file', f);
  $('#af_upload_status').textContent = 'Uploading...';
  try {
    const r = await fetch('/api/upload', { method: 'POST', headers: { 'Authorization': 'Bearer ' + TOKEN }, body: fd });
    const j = await r.json(); if (!r.ok) throw new Error(j.detail || 'Upload failed');
    $('#af_avatar_url').value = j.url;
    $('#af_upload_status').textContent = 'Done — URL filled in';
    toast('Avatar URL set');
  } catch(e) { $('#af_upload_status').textContent = ''; toast(e.message, true); }
}

async function saveAuthor(isNew) {
  const url = $('#af_avatar_url').value.trim();
  const d = { name: $('#af_name').value, initials: $('#af_initials').value, color: $('#af_color').value, bio: $('#af_bio').value, avatar_url: url || null };
  try {
    if (isNew) await api('/api/authors', { method: 'POST', body: JSON.stringify(d) });
    else await api('/api/authors/' + editingAuthor.id, { method: 'PUT', body: JSON.stringify(d) });
    toast(isNew ? 'Created' : 'Saved');
    editingAuthor = null; loadAuthors();
  } catch(e) { toast(e.message, true); }
}

function esc(s) { if (!s) return ''; const d = document.createElement('div'); d.textContent = String(s); return d.innerHTML; }

render();
</script>
</body></html>"""


@router.get("/sakuracloud", response_class=HTMLResponse)
@router.get("/sakuracloud/{path:path}", response_class=HTMLResponse)
def admin_panel(request: Request):
    return ADMIN_HTML
