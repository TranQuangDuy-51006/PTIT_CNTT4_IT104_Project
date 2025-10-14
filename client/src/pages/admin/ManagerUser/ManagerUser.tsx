import React, { useState, useEffect } from "react";
import styles from "./ManagerUser.module.scss";
import { FiSearch } from "react-icons/fi";
import Pagination from "../../../components/Pagination/Pagination";
import authService from "../../../service/authServices";
import type { User } from "../../../utils/types";

type UserUI = User & {
  name: string;
  username: string;
  status: string;
};

export default function ManagerUser() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<UserUI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await authService.getAll();
        setUsers(
          data.map((u) => ({
            ...u,
            name: `${u.firstName} ${u.lastName}`,
            username: `@${u.firstName.toLowerCase()}`,
            status: "hoạt động",
          }))
        );
      } catch (error) {
        console.error("Lấy dữ liệu user thất bại:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      (u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      (u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
  );

  const usersPerPage = 3;
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <div className={styles.main}>
      <div className={styles.topBar}>
        <h2>
          Team members{" "}
          <span className={styles.count}>{filteredUsers.length} users</span>
        </h2>

        <div className={styles.searchBox}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search user..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Email address</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className={styles.userInfo}>
                    <div className={styles.avatar}>{user.name.charAt(0)}</div>
                    <div>
                      <p className={styles.name}>{user.name}</p>
                      <p className={styles.username}>{user.username}</p>
                    </div>
                  </div>
                </td>
                <td>{user.status}</td>
                <td>{user.email}</td>
                <td>
                  <div className={styles.activeBox}>
                    <span className={styles.actionBlock}>block</span>
                    <span className={styles.actionUnblock}>unblock</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className={styles.boxPagi}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
