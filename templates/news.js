var newsHeadlines='/news/headlines'
const allHeadlines=document.querySelector('.card')
const img=document.querySelector('.card-img-top')
const headline=document.querySelector('.card-text')

window.addEventListener('load',(event)=>{
    headline.textContent="Loading...";
    const url=newsHeadlines
    fetch(url).then(response=>{
        response.json().then(data=>{
            key=data.articles
            for(i=0;i<key.length;i++){
               for(const [keys,value] of Object.entries(key[i])){
                   if(keys==='author'){
                       console.log(value)
                       headline.textContent=value
                   }
               }
            }
        })
    })
})