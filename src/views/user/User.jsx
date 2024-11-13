import { useCallback, useEffect, useState } from "react";
import useUser from "../../components/hooks/UseUser";
import axios from "axios";
import toast from "react-hot-toast";
import ConfirmationModal from "../../components/ConfirmationModal";
import { FaEye } from "react-icons/fa";

function User() {
  const user = useUser();

  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [hiddenCategories, setHiddenCategories] = useState([]);

  const getHiddenCategories = useCallback(() => {
    axios.get('/categories/hidden').then(({ data }) => {
      setHiddenCategories(data);
    }).catch(error => {
      toast.error('Failed to fetch hidden categories');
      console.error(error);
    });
  }, []);

  useEffect(() => {
    getHiddenCategories();
  }, []);

  const editUser = useCallback(() => {
    if (!newEmail && !newPassword) {
      toast.error('Email or password is required');
      return;
    }
    if (newPassword) {
      axios.put('/user', {
        email: newEmail ?? user.email,
        password: newPassword,
      }).then(() => {
        toast.success('User updated');
        axios.post('/logout').then(() => {
          window.location.href = '/login';
        });
      }).catch(error => {
        toast.error('Failed to update user');
        console.error(error);
      }); 
    } else if (newEmail) {
      axios.patch(`/user?email=${newEmail}`).then(() => {
        toast.success('User updated');
        axios.post('/logout').then(() => {
          window.location.href = '/login';
        });
      }).catch(error => {
        toast.error('Failed to update user');
        console.error(error);
      });
    }


  }, [newEmail, newPassword, user])

  const deleteUser = useCallback(() => {
    axios.delete('/user').then(() => {
      toast.success('User deleted');
      axios.post('/logout').then(() => {
        window.location.href = '/';
      });
    }).catch(error => {
      toast.error('Failed to delete user');
      console.error(error);
    });
  }, []);

  useEffect(() => {
    getHiddenCategories();
  }, [getHiddenCategories]);

  const unHideCategory = useCallback((category) => {
    axios.patch(`/categories/unhide?id=${category.id}`).then(() => {
      toast.success(`Unhid category ${category.name}`);
      getHiddenCategories();
    }).catch(error => {
      toast.error('Failed to unhide category');
      console.error(error);
    });
  }, [getHiddenCategories]);

  const deleteAllHidden = useCallback(() => {
    const ids = hiddenCategories.map(category => category.id);
    axios.delete('/categories/deleteMany', {
      ids,
    }).then(() => {
      toast.success('Deleted all hidden categories');
      getHiddenCategories();
    }).catch(error => {
      toast.error('Failed to delete hidden categories');
      console.error(error);
    });
  }, [getHiddenCategories, hiddenCategories]);


  return (
    <div className="grid grid-cols-2 gap-20">
      <div className="rounded-lg bg-gray-100 p-8">
        <div>
          <h1 className="text-3xl font-semibold">Hi, {user?.email}!</h1>
        </div>
        <hr className="h-px my-8"/>
        <div>
          <p className="font-semibold my-2">User settings</p>
          <div className="flex gap-2 flex-col">
            <input className="p-2 rounded-lg" type="text" placeholder="New email" value={newEmail} onChange={e => setNewEmail(e.target.value)} />
            <input className="p-2 rounded-lg" type="password" placeholder="New password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            <button onClick={editUser} className="bg-gray-200 text-black p-2 rounded-md">Save</button>
          </div>
        </div>
        <hr className="h-px my-8"/>
        <div>
          <button className="w-full bg-red-500 text-white hover:bg-red-400" onClick={() => setDeleteUserModal(true)}>Delete user</button>
        </div>
      </div>
      <div className="rounded-lg bg-gray-100 p-8">
        <h1 className="text-3xl font-semibold">Hidden categories</h1>
        <div className="bg-white h-3/5 mt-6 rounded-lg overflow-scroll no-scrollbar">
          {hiddenCategories.map(category => (
            <div key={category.id} className
            ="flex justify-between p-2 border-b">
              <p className="my-auto font-semibold">{category.name}</p>
              <div className="h-fit my-auto cursor-pointer " onClick={() => unHideCategory(category)}>
                <FaEye className="opacity-30"/>
              </div>
            </div>
          ))}
        </div>
          <button className="w-full bg-red-500 text-white hover:bg-red-400 my-12" onClick={() => deleteAllHidden()}>
            Delete all
          </button>
      </div>
      <ConfirmationModal
        title="Delete account"
        message={`Are you sure you want to delete your account?`}
        isOpen={!!deleteUserModal}
        setIsOpen={setDeleteUserModal}
        confirmationCallback={() => deleteUser()}
      />
    </div>
  );
}

export default User;