import React, { useEffect, forwardRef, useRef, useState, useImperativeHandle } from 'react';
import './PreviewImage.less';
import SvgFangDa from './svg/SvgFangDa';
import SvgSuoXiao from './svg/SvgSuoXiao';
import SvgRotate from './svg/SvgRotate';
import getFixScaleEleTransPosition from './getPosition';


const initLocation = {
    deltaX: 0,
    deltaY: 0,
    originX: 0,
    originY: 0
};

const initPosition = {
    x: 0,
    y: 0
}


const PreviewImage = forwardRef(({ src }, ref) => {
    const location = useRef(initLocation); //拖拽时鼠标和元素的位置
    const [position, setPosition] = useState(initPosition); //图片平移位置
    const scale = useRef(1);  //缩放大小
    const rotate = useRef(0); //旋转角度
    const imgRef = useRef();
    const isMoving = useRef(false);  //元素是否可以移动
    //重置对图片的所有操作
    const reset = () => {
        scale.current = 1;
        rotate.current = 0;
        setPosition({ ...initLocation });
    }
    let styles = {
        transform: `scale3d(${scale.current},${scale.current},1)rotate(${rotate.current}deg)`
    }
    //旋转
    const handleRotate = () => {
        rotate.current -= 90;
        setPosition({ ...initPosition });
    }
    //方法缩小
    const handleSize = (type) => {
        if (type === '0' && scale.current > 1) {  //缩小
            scale.current -= 1;
        }
        if (type === '1') {  //放大
            scale.current += 1;
        }
        setPosition({ ...initPosition });
    }

    useImperativeHandle(
        ref,
        () => ({
            handleRotate,
            handleSize,
            reset
        })
    )
    //鼠标移动
    const mouseMove = e => {
        if (!isMoving.current) return;
        setPosition({
            x: e.pageX - location.current.deltaX,
            y: e.pageY - location.current.deltaY
        });
    }
    //鼠标按下
    const mouseDown = e => {
        e.preventDefault();
        location.current.deltaX = e.pageX - position.x;
        location.current.deltaY = e.pageY - position.y;
        location.current.originX = position.x;
        location.current.originY = position.y;
        isMoving.current = true;
    }
    //鼠标抬起
    const mouseUp = e => {
        e.preventDefault();
        if (!isMoving.current) return;
        var width = imgRef.current.offsetWidth * scale.current;
        var height = imgRef.current.offsetHeight * scale.current;
        var imgRef$current$getBo = imgRef.current.getBoundingClientRect(),
            left = imgRef$current$getBo.left,
            top = imgRef$current$getBo.top;
        var isRotate = rotate.current % 180 !== 0;
        var fixState = getFixScaleEleTransPosition(isRotate ? height : width, isRotate ? width : height, left, top);
        isMoving.current = false;
        if (fixState) {
            setPosition(prevFixState => ({ ...prevFixState, ...fixState }));
        }
        location.current = initLocation;
    }
    //鼠标滑轮
    const onWheel = e => handleSize(e.deltaY > 0 ? '0' : '1');
    useEffect(function () {
        window.addEventListener('mouseup', mouseUp);
        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('wheel', onWheel);
        return () => {
            window.removeEventListener('mouseup', mouseUp);
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('wheel', onWheel);
        }
    }, []);
    return <div className='img_box'>
        <div className={['img_preview', isMoving.current ? 'img_preview_moving' : ''].join(' ')}
            style={{ transform: `translate(${position.x}px,${position.y}px)` }}
        >
            <img style={styles}
                ref={imgRef} src={src}
                alt="..."
                className='img'
                onMouseDown={mouseDown} />
        </div>
        <div className='controll'>
            <span onClick={() => handleSize('1')}>
                <i><SvgFangDa /></i>
                <span>放大</span>
            </span>
            <span onClick={() => handleSize('0')}>
                <i><SvgSuoXiao /></i>
                <span>缩小</span>
            </span>
            <span onClick={handleRotate}>
                <i><SvgRotate /></i>
                <span>旋转</span>
            </span>
        </div>
    </div>

})


export default PreviewImage;