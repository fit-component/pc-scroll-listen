import React from 'react'
import { ScrollListenContainer, ScrollListenBox, ScrollListenNail , ScrollListen } from 'fit-scroll-listen'

export default class Demo extends React.Component {
    render() {
        return (
            <ScrollListenContainer style={{display:'flex'}}>
                <ScrollListenBox style={{height:150,width:150,overflowY:"auto",padding:10,border:'1px solid #ccc',marginRight:10}}>
                    <ScrollListenNail title="第一位置">第一个位置</ScrollListenNail>
                    <p>
                        内容<br/>内容<br/>内容<br/>内容<br/>内容<br/>内容
                    </p>
                    <ScrollListenNail title="第二位置">第二个位置</ScrollListenNail>
                    <p>
                        内容<br/>内容<br/>内容<br/>内容<br/>内容<br/>内容
                    </p>
                    <ScrollListenNail title="第三位置">第三个位置</ScrollListenNail>
                    <p>
                        内容<br/>内容<br/>内容<br/>内容<br/>内容<br/>内容
                    </p>
                </ScrollListenBox>
                <ScrollListen/>
            </ScrollListenContainer>
        )
    }
}