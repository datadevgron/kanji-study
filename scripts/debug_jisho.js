async function run(){
  try{
    const res = await fetch('https://jisho.org/api/v1/search/words?keyword=日')
    const json = await res.json()
    function extractJlpt(it){
      if(!it) return null
      if(Array.isArray(it.jlpt) && it.jlpt.length){
        const t = it.jlpt.find(x=>/jlpt[-_ ]?n?\d+/i.test(x))
        if(t){
          const m = t.match(/jlpt[-_ ]?n?(\d+)/i)
          if(m && m[1]) return `N${m[1]}`
        }
      }
      if(it.tags && Array.isArray(it.tags)){
        const t = it.tags.find(tag => /jlpt[-_ ]?n?\d+/i.test(tag) || /\bN[1-5]\b/i.test(tag))
        if(t){
          const m = t.match(/jlpt[-_ ]?n?(\d+)/i) || t.match(/\bN(\d)\b/i)
          if(m && m[1]) return `N${m[1]}`
        }
      }
      if(it.senses && Array.isArray(it.senses)){
        for(const s of it.senses){
          if(s.tags && Array.isArray(s.tags)){
            const t = s.tags.find(tag => /jlpt[-_ ]?n?\d+/i.test(tag) || /\bN[1-5]\b/i.test(tag))
            if(t){
              const m = t.match(/jlpt[-_ ]?n?(\d+)/i) || t.match(/\bN(\d)\b/i)
              if(m && m[1]) return `N${m[1]}`
            }
          }
        }
      }
      return null
    }

    for(const d of json.data){
      const w = (d.japanese && d.japanese[0] && (d.japanese[0].word || d.japanese[0].reading)) || '<no word>'
      console.log(w, '-> jisho.jlpt=', JSON.stringify(d.jlpt), ' extractJlpt=', extractJlpt(d))
    }
  }catch(e){
    console.error(e)
  }
}
run()
