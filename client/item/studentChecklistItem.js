
import PropTypes from 'prop-types';

const Item = (props)=>{
    const {title,status} = props
    return (
        <div className=''>
                 <li className='grid justify-items-center items-center text-center '>
                    <div className='flex gap-x-8 justify-between  bg-gray py-4 px-20 m-3 w-5/6 rounded-lg hover:bg-green '>{title}<span>{status}</span></div>
                </li>
        
        </div>
   
    );
}

Item.propTypes={
    title:PropTypes.string.isRequired,
    status:PropTypes.number.isRequired
}

export default Item 